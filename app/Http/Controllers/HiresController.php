<?php

namespace App\Http\Controllers;

// MODELS
use \App\Hire;
use \App\HireStep;
use \App\HireType;
use \App\HireLock;
use \App\Step;
use \App\User;
use Carbon\Carbon;

use App\Notifications\NewHireAdded;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;

class HiresController extends Controller
{
    /**
     * Returns a listing of hires.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return Hire::where('is_active', 1)->with('hireSteps')->withCount(['hireSteps' => function($query){
            $query->where('status', '=', 2);
        }])->get();
    }

    /**
     * Locks and returns success status
     *
     * @return \Illuminate\Http\Response
     */
    public function lock(Hire $hire) {
        $hireLock = HireLock::where('hire_id', $hire->id)->first();
        return response()->json(['success' => $hireLock->lock()]);
    }

    /**
     * Unlocks a hire
     *
     * @return \Illuminate\Http\Response
     */
    public function unlock(Hire $hire){
        $hireLock = HireLock::where('hire_id', $hire->id)->first();
        return response()->json(['success' => $hireLock->unlock()]);
    }

    /**
     * Returns a listing of hires within search parameters.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(){
        $filters = json_decode(request()->getContent());
        $hiresFromSearch = new Collection();
        $hires = new Collection;
        $hiresFromFilters = $this->filterHires($filters);

        // Laravel search is required to be directly on the static model, so check if there is searching first
        if (!empty($filters->searchText)) {
            $hiresFromSearch = Hire::search($filters->searchText)->get();

            foreach ($hiresFromSearch as $hireFromSearch) {
                foreach ($hiresFromFilters as $hireFromFilter) {
                    if ($hireFromSearch->id == $hireFromFilter->id) {
                        $hires->push($hireFromSearch);
                    }
                }
            }
        } else {
            $hires = $hiresFromFilters;
        }

        return $hires;
    }

    public function filterHires($filters) {
        $hiresFromFilters = Hire::select();

        if (!empty($filters->step)) {
            $hiresFromFilters = $hiresFromFilters->whereHas('hireSteps', function($query, $filters) {
                $query->where('step_id', $filters->step);
                $query->where('status', 0);
            });
        }

        if (!empty($filters->userId)) {
            $hiresFromFilters = $hiresFromFilters->where(function($query) use ($filters) {
                $query->where('manager_id', $filters->userId)
                    ->orWhere('admin_id', $filters->userId)
                ;
            });
        }

        if (!empty($filters->startDate) && !empty($filters->endDate)) {
            $startFilter = $filters->startDate;
            $endFilter   = $filters->endDate;
            $startFilter = date('Y-m-d', strtotime($startFilter));
            $endFilter   = date('Y-m-d', strtotime($endFilter));

            // dd($endFilter);

            $hiresFromFilters = $hiresFromFilters->whereBetween('start_date', [$startFilter, $endFilter]);
        } else if (!empty($filters->endDate)) {
            $endFilter = $filters->endDate;
            $endFilter = new Carbon(date('Y-m-d', strtotime($endFilter)));

            $hiresFromFilters = $hiresFromFilters->whereDate('start_date', '<=', $endFilter);
        } else if (!empty($filters->startDate)) {
            $startFilter = $filters->startDate;
            $startFilter = new Carbon(date('Y-m-d', strtotime($startFilter)));

            $hiresFromFilters = $hiresFromFilters->whereDate('start_date', '>=', $startFilter);
        } 

        if (!empty($filters->inactive)) {
            $hiresFromFilters = $hiresFromFilters->where('is_inactive', $filters->inactive);
        }


        return $hiresFromFilters->get();
    }

    /**
     * Returns a listing of hires with a certain step that is uncompleted.
     * @param $stepId
     * @return \Illuminate\Http\Response
     */
    public function hiresWithIncompleteStep($stepId){
        dd(request(), $stepId);
        // TODO: Figure out data structure before beginning, then complete.
        return request();
    }

    /**
     * Store a newly created hire in database.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(){
        $hire = Hire::create($this->validateHireCreation());

        // For each step, create a hire_step associated to hire
        $steps = Step::get();
        foreach ($steps as $step) {
            HireStep::create([
                "hire_id" => $hire->id,
                "step_id" => $step->id,
                "step_name" => $step->name
            ]);
        }

        // Add into the hire_locks table
        HireLock::create([
            "hire_id" => $hire->id
        ]);

        if($hire->manager_id == null){
            User::first()->notify(new NewHireAdded($hire));
        } else {
            User::find($hire->manager_id)->notify(new NewHireAdded($hire));
        }
        
    }

    /**
     * Update the hire in storage.
     *
     * @param  \App\Hire  $hire
     * @return \Illuminate\Http\Response
     */
    public function update(Hire $hire) {
        $hire->update($this->validateHireUpdate());
    }

    /**
     * Remove the hire from storage.
     *
     * @param  \App\Hire  $hire
     * @return \Illuminate\Http\Response
     */
    public function destroy(Hire $hire){
        HireStep::where('hire_id', $hire->id)->delete();
        HireLock::where('hire_id', $hire->id)->delete();
        $hire->delete();
        return;
    }

    public function test(){
        return Hire::where('is_active', 1)
        ->whereRaw('DATEDIFF(start_date, CURDATE()) < 100')
        ->select('first_name', 'last_name', 'start_date')
        ->withCount(['hireSteps' => function($query){
            $query->where('status', '!=', 2);
        }])
        ->having('hire_steps_count', '>', 0)->get();
    }

    protected function validateHireCreation(){
        return request()->validate([
            'regional_location' => ['nullable', 'max:255'],
            'first_name' => ['required', 'min:1', 'max:255'],
            'last_name' => ['required', 'min:1', 'max:255'],
            'email' => ['nullable', 'max:255', 'email', 'nullable'],
            'cwid' => ['nullable', 'max:100'],
            'gender' => ['nullable', 'max:100'],
            'hire_type' => ['nullable', 'max:255'],
            'start_date' => ['nullable', 'date'],
            'vendor' => ['nullable', 'max:255'],
            'role' => ['nullable', 'max:255'],
            'pl_ic' => ['nullable', 'max:255'],
            'team_name' => ['nullable', 'max:255'],
            'platform' => ['nullable', 'max:255'],
            'manager_id' => ['nullable', 'nullable', 'numeric'],
            'hire_status' => ['nullable', 'max:255'],
            'onboarding_buddy' => ['nullable', 'max:255'],
            'computer_needs' => ['nullable', 'max:255'],
            'seat_number' => ['nullable', 'max:255'],
            'campus' => ['nullable', 'max:100'],
            'manager_comments' => ['nullable'],
            'neid' => ['nullable', 'numeric',],
            'hire_ticket' => ['nullable', 'max:255'],
            'mac_ticket' => ['nullable', 'max:255'],
            'admin_id' => ['nullable', 'numeric'],
            'slack_url' => ['nullable', 'max:255'],
            'is_active' => ['nullable'],
            'set_inactive_on' => ['nullable', 'date']
        ]);
    }

    protected function validateHireUpdate(){
        return request()->validate([
            'regional_location' => ['nullable', 'max:255'],
            'first_name' => ['nullable', 'min:1', 'max:255'],
            'last_name' => ['nullable', 'min:1', 'max:255'],
            'email' => ['nullable', 'max:255', 'email'],
            'cwid' => ['nullable', 'max:100'],
            'gender' => ['nullable', 'max:100'],
            'hire_type' => ['nullable', 'min:1', 'max:255'],
            'start_date' => ['nullable', 'date'],
            'vendor' => ['nullable', 'max:255'],
            'role' => ['nullable', 'max:255'],
            'pl_ic' => ['nullable', 'max:255'],
            'team_name' => ['nullable', 'max:255'],
            'platform' => ['nullable', 'max:255'],
            'manager_id' => ['nullable', 'numeric'],
            'hire_status' => ['nullable', 'max:255'],
            'onboarding_buddy' => ['nullable', 'max:255'],
            'computer_needs' => ['nullable', 'max:255'],
            'seat_number' => ['nullable', 'max:255'],
            'campus' => ['nullable', 'max:100'],
            'manager_comments' => ['nullable'],
            'neid' => ['nullable', 'numeric'],
            'hire_ticket' => ['nullable', 'max:255'],
            'mac_ticket' => ['nullable', 'max:255'],
            'admin_id' => ['nullable', 'numeric'],
            'slack_url' => ['nullable', 'max:255'],
            'is_active' => ['nullable'],
            'set_inactive_on' => ['nullable', 'date']
        ]);
    }
}
