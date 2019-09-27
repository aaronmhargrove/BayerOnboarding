import React from 'react';
import Paper from '@material-ui/core/Paper';
import './upcomingDates.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { currentUser } from '../../../global';
import axios from 'axios';

var upcomingDates = [];

class UpcomingDates extends React.Component {
    state = { loading: true };

    componentDidMount() {
        upcomingDates = [];

        axios.get('/users/' + currentUser.data.id + '/upcoming')
        .then(response => {
            console.log('Upcoming Dates: ', response);
             response.data.forEach(entry => {
                 upcomingDates.push(entry);
             });
            for(var i = 0; i < 5; i++){
                upcomingDates.push(response.data[i]);
            }
            this.setState({loading: false});
        }).catch(response => {
            if (response.response.status == 422){ // Validation error
                var fieldIssues = response.response.data.errors;
                var issueKeys = Object.keys(fieldIssues);
                console.log(fieldIssues)
                issueKeys.forEach(key => {
                    var issueArray = fieldIssues[key];
                    issueArray.forEach(element => {
                        this.props.enqueueSnackbar(element, { // Display what was wrong with fields
                            variant: 'error',
                            autoHideDuration: 5000
                        });
                    });
                });
              }
            else{ // Generic laravel error
                this.props.enqueueSnackbar("Oops! Something went wrong! " + response.response.data.message, {
                    variant: 'error',
                    autoHideDuration: 10000
                });
            }
        });
    }

    render() {
        return(
            <Paper className="upcomingDatesWidget">
                {this.state.loading ? <div className="loadingSpinner"><CircularProgress size="5rem"/></div> : 
                    <div>
                        <Paper className="upcomingDatesHeader">
                            <div className="headerText">Upcoming Dates</div>
                        </Paper>
                        <div className="upcomingDatesTableContainer">
                        <MaterialTable className="table"
          icons={{
            Check: Check,
            Clear: Clear,
            DetailPanel: ChevronRight,
            Export: SaveAlt,
            Filter: FilterList,
            FirstPage: FirstPage,
            LastPage: LastPage,
            NextPage: ChevronRight,
            PreviousPage: ChevronLeft,
            ResetSearch: Clear,
            Search: Search,
            SortArrow: ArrowDownward,
            ThirdStateCheck: Remove
          }}
          columns={
              [
                {         
                    title: 'Name',
                    field: 'name',
                    headerStyle: {minWidth: '8vw'}, 
                    cellStyle: {minWidth: '8vw'}
                },
                {
                    title: 'Step',
                    field: 'step',
                    headerStyle: {minWidth: '8vw'}, 
                    cellStyle: {minWidth: '8vw'}
                },
                {
                    title: 'Due Date',
                    field: 'dueDate',
                    headerStyle: {minWidth: '8vw'}, 
                    cellStyle: {minWidth: '8vw'}
                }
              ]
          }
          data={{
              name: 'Dwight Schrute',
              step: 'Assign Admin',
              dueDate: '2019-09-28'
          }}
          options={{
            search: false,
            paging: false,
            pageSize: 1,
            maxBodyHeight: '58vh',
            toolbar: false
          }}
          title="Demo Title"
        />
                        </div>
                    </div>
                }
            </Paper>
        );
    }
}

export default UpcomingDates;