/*
* Author: Matthew Chaplin
* Bayer Onboarding
* Date: 4/6/19
*/
import React from 'react';
import MaterialTable from 'material-table';
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import HourglassEmpty from '@material-ui/icons/HourglassEmpty'
import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Done from '@material-ui/icons/Done'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Clear from '@material-ui/icons/Clear'

import './steppertable.css';

class StepperTable extends React.Component {
  state = {
    filterModalOpen: false,
    lastName: '',
    firstName: '',
    name: '',
    hireDate: '',
    regionalLocation: '',
    gender: '',
    hireType: '',
    pdStartDate: '',
    role: '',
    teamName: '',
    platform: '',
    manager: '',
    hireStatus: '',
    computerNeeds: '',
    onboardingCampus: '',
    onboardingBuddy: '',
    adminName: '',
    cwid: '',
    vendor: '',
    plic: '',
    seatNum: '',
    neid: '',
    newHireRehireTicket: '',
    macTicket: '',
    managerComments: '',
    dateEnteredHire: '',
    dateEnteredMacTicket: '',
    dateLaptopDelivered: '',
    onboardingBuddyEmailSent: '',
    addToDlsAndPdOrg: '',
    welcomeEmailSent: '',
    hireTicketIncomplete: false,
    hireTicketInProgress: false,
    hireTicketComplete: true,
    macTicketIncomplete: false,
    macTicketInProgress: false,
    macTicketComplete: true,
    laptopDeliveredIncomplete: false, 
    laptopDeliveredInProgress: true,
    laptopDeliveredComplete: false,
    onBoardingEmailIncomplete: true,
    onBoardingEmailInProgress: false,
    onBoardingEmailComplete: false,
    addToDlsAndPdOrgIncomplete: true,
    addToDlsAndPdOrgInProgress: false,
    addToDlsAndPdOrgComplete: false
  };
  onModalClose = () => {
    this.setState({
      filterModalOpen: false
    });
  }
  onModalOpen = (rowData) => {
    this.setState({
      filterModalOpen: true
    });
  }
  render() {
    const { columns } = this.props;
    return (
      <div style={{ maxWidth: '100%' }}>
        <Modal
          open={this.state.filterModalOpen}
          onClose={this.onModalClose}
        >
          <Paper className="editWidget">
            <Grid container space={40} className="gridContainer">
              <Grid item xs={8} className="gridItem">
                <Grid container space={20} >
                  <Grid item xs={12} className="gridItem">
                    <div className="headerText">Hire Data</div>
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Last Name" value={this.state.lastName} onChange={this.onLastNameEnter} required />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="First Name" value={this.state.firstName} onChange={this.onFirstNameEnter} required />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField
                      label="Date Entered"
                      type="date"
                      value={this.state.DateEntered}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.onDateEntered}
                      required={true}
                      required
                    />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Regional Location" value={this.state.regionalLocation} onChange={this.onRegionalLocationEnter} required />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="CWID" value={this.state.cwid} onChange={this.onCWIDEnter} />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <FormControl>
                      <InputLabel htmlFor="gender-selector" required>Gender</InputLabel>
                      <Select
                        value={this.state.gender}
                        onChange={this.onGenderSelect}
                        input={<Input id="gender-selector" />}
                        required
                      >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <FormControl>
                      <InputLabel htmlFor="hireType-selector" required>Hire Type</InputLabel>
                      <Select
                        value={this.state.hireType}
                        onChange={this.onHireTypeSelect}
                        input={<Input id="hireType-selector" />}
                        required
                      >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="direct">Direct</MenuItem>
                        <MenuItem value="contract">Contract</MenuItem>
                        <MenuItem value="sow">SOW</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField
                      label="PD Start Date"
                      type="date"
                      value={this.state.pdStartDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.onPdStartDatePick}
                      required={true}
                      required
                    />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Vendor" value={this.state.vendor} onChange={this.onVendorEnter} />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Role" value={this.state.role} onChange={this.onRoleEnter} required />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <FormControl>
                      <InputLabel htmlFor="plic-selector">PL/IC</InputLabel>
                      <Select
                        value={this.state.plic}
                        onChange={this.onPLICSelect}
                        input={<Input id="plic-selector" />}
                        required
                      >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="direct">PL</MenuItem>
                        <MenuItem value="contract">IC</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Team Name" value={this.state.teamName} onChange={this.onTeamNameEnter} required />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Platform" value={this.state.platform} onChange={this.onPlatformEnter} required />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Manager" value={this.state.manager} onChange={this.onManagerEnter} required />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <FormControl>
                      <InputLabel htmlFor="hireStatus-selector" required>Hire Status</InputLabel>
                      <Select
                        value={this.state.hireStatus}
                        onChange={this.onHireStatusSelect}
                        input={<Input id="hireStatus-selector" />}
                        required
                      >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="rehire">Rehire</MenuItem>
                        <MenuItem value="transfer">Transfer</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Onboarding Buddy" value={this.state.onboardingBuddy} onChange={this.onOnboardingBuddyEnter} />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <FormControl>
                      <InputLabel htmlFor="computerNeeds-selector" required>Computer Needs</InputLabel>
                      <Select
                        value={this.state.computerNeeds}
                        onChange={this.onComputerNeedsSelect}
                        input={<Input id="computerNeeds-selector" />}
                      >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="new">Macbook</MenuItem>
                        <MenuItem value="rehire">Lenovo</MenuItem>
                        <MenuItem value="transfer">Mondesk</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="SEAT Number" value={this.state.seatNum} onChange={this.onSeatNumEnter} />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Onboarding Campus" value={this.state.onboardingCampus} onChange={this.onOnboardingCampusEnter} />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Manager Comments" value={this.state.managerComments} onChange={this.onManagerCommentsEnter} />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="NEID/EID" value={this.state.neid} onChange={this.onNEIDEnter} />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="New Hire/Rehire Ticket" value={this.state.newHireRehireTicket} onChange={this.onNewHireRehireTicketEnter} />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField
                      label="Hire Ticket Entered"
                      type="date"
                      value={this.state.dateEnteredHire}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.onDateEnteredHireDatePick}
                      required={false}
                    />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="MAC Ticket" value={this.state.macTicket} onChange={this.onMacTicketEnter} />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField
                      label="MAC Ticket Entered"
                      type="date"
                      value={this.state.dateEnteredMacTicket}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.onDateEnteredMacTicketDatePick}
                      required={false}
                    />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField
                      label="Laptop Delivered"
                      type="date"
                      value={this.state.dateLaptopDelivered}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.onDateLaptopDeliveredDatePick}
                      required={false}
                    />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField
                      label="Onboarding Buddy Email Sent"
                      type="date"
                      value={this.state.onboardingBuddyEmailSent}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.onOnboardingBuddyEmailSentDatePick}
                      required={false}
                    />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField
                      label="Add to DLs/PD Org"
                      type="date"
                      value={this.state.addToDlsAndPdOrg}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.onAddToDlsAndPdOrgDatePick}
                      required={false}
                    />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField
                      label="Welcome Email Sent"
                      type="date"
                      value={this.state.welcomeEmailSent}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.onWelcomeEmailSentDatePick}
                      required={false}
                    />
                  </Grid>
                  <Grid item xs={6} className="gridItem">
                    <TextField label="Admin Name" value={this.state.adminName} onChange={this.onAdminEnter} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3} className="noScroll">
                <Grid container space={20} className="gridContainer">
                  <Grid item xs={3} className="noScroll">
                    <div className="headerText">Progress</div>
                  </Grid>
                  <Grid item xs={3} className="noScroll">
                    <List className="progress-list">
                      <ListItem>
                        <ListItemText primary="Hire Ticket Submitted" style={{ borderColor: this.state.hireTicketStatus }} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="MAC Ticket Submitted" style={{ borderColor: this.state.macTicketStatus }} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Laptop Delivered" style={{ borderColor: this.state.laptopDeliveredStatus }} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Onboarding Email Sent" style={{ borderColor: this.state.onboardingEmailStatus }} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Added to DLs/PD Org" style={{ borderColor: this.state.addToDlsAndPdOrgStatus }} />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={1} className="noScroll-icons">
                    <List className="progress-list">
                      <ListItem>
                        <ListItemIcon >
                          {this.state.hireTicketIncomplete && <Clear className="incomplete-icon"/>}
                          {this.state.hireTicketInProgress && <HourglassEmpty className="in-progress-icon"/>}
                          {this.state.hireTicketComplete && <Done className="complete-icon"/>}
                        </ListItemIcon>
                      </ListItem>
                      <ListItem>
                      <ListItemIcon >
                      {this.state.macTicketIncomplete && <Clear className="incomplete-icon"/>}
                          {this.state.macTicketInProgress && <HourglassEmpty className="in-progress-icon"/>}
                          {this.state.macTicketComplete && <Done className="complete-icon"/>}
                        </ListItemIcon>
                      </ListItem>
                      <ListItem>
                      <ListItemIcon >
                      {this.state.laptopDeliveredIncomplete && <Clear className="incomplete-icon"/>}
                          {this.state.laptopDeliveredInProgress && <HourglassEmpty className="in-progress-icon"/>}
                          {this.state.laptopDeliveredComplete && <Done className="complete-icon"/>}
                        </ListItemIcon>
                      </ListItem>
                      <ListItem>
                      <ListItemIcon >
                      {this.state.onBoardingEmailIncomplete && <Clear className="incomplete-icon"/>}
                          {this.state.onBoardingEmailInProgress && <HourglassEmpty className="in-progress-icon"/>}
                          {this.state.onBoardingEmailComplete && <Done className="complete-icon"/>}
                        </ListItemIcon>
                      </ListItem>
                      <ListItem>
                      <ListItemIcon >
                      {this.state.addToDlsAndPdOrgIncomplete && <Clear className="incomplete-icon"/>}
                          {this.state.addToDlsAndPdOrgInProgress && <HourglassEmpty className="in-progress-icon"/>}
                          {this.state.addToDlsAndPdOrgComplete && <Done className="complete-icon"/>}
                        </ListItemIcon>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
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
          columns={columns}
          onRowClick={(rowData) => this.onModalOpen(rowData)}
          data={[
            {
              name: 'Winky, Tinky',
              hireDate: '11/5/2018',
              regionalLocation: 'US-STL',
              cwid: 'TLWIN',
              gender: 'F',
              hireType: 'Contract',
              pdStartDate: '11/26/2018',
              vendor: 'ABC',
              role: 'Software Developer',
              plic: 'IC',
              teamName: 'Teletubbies',
              platform: 'Field',
              manager: 'La, La',
              hireStatus: 'New',
              onboardingBuddy: 'Hunt, Naomi',
              computerNeeds: 'Macbook',
              seatNum: 'G2022E',
              onboardingCampus: 'MC',
              managerComments: '',
              neid: 12345,
              newHireRehireTicket: 'REQ55555',
              dateEnteredHire: '11/8/2018',
              macTicket: 'REQ11111',
              dateEnteredMacTicket: '11/8/2018',
              dateLaptopDelivered: '11/22/2018',
              onboardingBuddyEmailSent: '11/22/2018',
              addToDlsAndPdOrg: '11/8/2018',
              welcomeEmailSent: '11/22/2018',
              adminName: 'Susan'
            }
          ]}
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
    );
  }
}

export default StepperTable;