import React from "react"
import DraftForm from "./draftForm.js"
import AdminBar from "./adminBar.js"
import * as styles from "../styles/draftmain.module.css"
import * as adminStyles from "../styles/adminbar.module.css"

// TODO
// - Submit draft to database
// - Begin draft and grey out sections that can't be used after draft start
// - Number of rounds selection
// - Passwords
//   - Admin password and panel
//   - Drafter password
// - Styling
// - Autocomplete draft player
// - Player logos



function Pick(roundNo, pickNo, overallPickNo, teamName, playerid, playerName, playerLogo) {
  this.roundNo       = roundNo;
  this.pickNo        = pickNo;
  this.teamName      = teamName;
  this.playerid      = playerid;
  this.playerName    = playerName;
  this.playerLogo    = playerLogo;
}


export default class DraftMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teamNames:     [],     // Array of strings for each team name in the draft order
      picks:         [],     // Stores an array of Pick() objects
      // TODO should this be in state?
      roundNo:       [],     // Current round of the draft, starts at 1
      // TODO should this be in state?
      pickNo:        [],     // Current pick number within the round, starts at 1
      nRounds:        8,     // Number of rounds in the draft
      isDraftStarted: false,
    };

    // TODO should this be in state
    this.snake = true; // Bool to toggle the type of draft

    this.handleNewTeam = this.handleNewTeam.bind(this);
    this.handleNewPick = this.handleNewPick.bind(this);
    this.undoPick = this.undoPick.bind(this);
    this.onTeamMove = this.onTeamMove.bind(this);
    this.updatePickNo = this.updatePickNo.bind(this);
    this.getTeamNameIndex = this.getTeamNameIndex.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onBegin = this.onBegin.bind(this);
  }

  handleNewTeam(teamName) {
    this.setState( state => {
      return state.teamNames.push(teamName);
    });
  }

  onTeamMove(iTeamName, shiftDirection) {
  // Shifts the team order based on the shiftDirection (1 or -1)
  // or deletes the team if shiftDirection is 0
    this.setState(state => {
      // Remove element at iTeamName and re-insert at iTeamName + shiftDirection
      const teamNames = state.teamNames.slice(0);

      if (shiftDirection) {
      // Duplicate state array since splice mutates the array
        teamNames.splice(
          iTeamName + shiftDirection, 0, teamNames.splice(iTeamName, 1)[0]
        );
      } else {
      // If shiftDirection is 0, delete the team
        teamNames.splice(iTeamName, 1);
      }

      return ({
        teamNames: teamNames
      });
    });
  }

  handleNewPick(playerName) { // TODO should the first arg be an event?
    // TODO
    // figure out how to supply players to the pick form

    const newPick = new Pick();
    newPick.playerName = playerName;
      // newPick.playerid = ;
      // newPick.playerLogo = ;

    this.setState( (state) => {
      newPick.roundNo  = state.roundNo;
      newPick.pickNo   = state.pickNo;
      // newPick.overallPickNo = state.roundNo ;
      let iTeamName = this.getTeamNameIndex(state);
      newPick.teamName = state.teamNames[iTeamName];

      const {newPickNo, newRoundNo} = this.updatePickNo(state, 1);

      return ({
        picks:        [...state.picks, newPick],
        roundNo:      newRoundNo,
        pickNo:       newPickNo,
        // nextPickTeam: state.teamNames[iTeamName],
      });

    });
  }

  undoPick() {
  // Remove the last pick from state
  // Decrement the current pick
    this.setState( (state) => {

      const {newPickNo, newRoundNo} = this.updatePickNo(state, -1);

      return {
        picks: state.picks.slice(0, -1),
        roundNo: newRoundNo,
        pickNo: newPickNo,
      };
    });
  }

  updatePickNo(state, direction) {
  // Utility function to calculate the next pick/round/team
  // Handles the snake and the beginning/end of round transitions\
  //
  // Inputs:
  //    state: object that contains the current component state
  //    direction: int that's either 1 or -1 to increment or decrement the pick

  // TODO make sure direction is 1 or -1 ?
    let newRoundNo;
    let newPickNo;

    if (direction > 0) {
      // Go forward a pick
      const endOfRound = state.pickNo === state.teamNames.length;
      newRoundNo = endOfRound ? state.roundNo + 1 : state.roundNo;
      newPickNo  = endOfRound ? 1                 : state.pickNo + 1;
    } else if (direction < 0) {
      // Go back a pick
      const beginningOfRound = state.pickNo === 1;
      newRoundNo = beginningOfRound ? state.roundNo - 1      : state.roundNo;
      newPickNo  = beginningOfRound ? state.teamNames.length : state.pickNo - 1;
    }

    return({
      newRoundNo: newRoundNo,
      newPickNo:  newPickNo,
    });

  }

  getTeamNameIndex({roundNo, pickNo}) {
  // Utility function to return the index of the teamname corresponding to the
  // round and pick numbers taking into account the snake order.

    let iTeamName;

    // Implement the snake order
    if (this.snake) {
      // Reverse the draft order for even round numbers.
      // roundNo is 1 based
      iTeamName = (roundNo % 2) > 0 ? pickNo - 1 : this.state.teamNames.length - pickNo;
    } else {
      iTeamName = pickNo - 1;
    }

    return iTeamName;

  }

  onReset() {
    this.setState({
      picks:         [],     // Stores an array of Pick() objects
      // TODO should this be in state?
      roundNo:       [],     // Current round of the draft, starts at 1
      // TODO should this be in state?
      pickNo:        [],     // Current pick number within the round, starts at 1
      nRounds:        8,     // Number of rounds in the draft
      isDraftStarted: false,
    });
  }

  onBegin() {
    this.setState({
      isDraftStarted: true,
    });
  }

  render() {

    return (
      <>
        <h2>This is the draft page!</h2>
        <AdminBar
          handleNewTeam={this.handleNewTeam}
          undoPick={this.undoPick}
          isDraftStarted={this.state.isDraftStarted}
          onReset={this.onReset}
          onBegin={this.onBegin}
        />
        <div className={styles.draftControls}>
          <DraftForm
            submitVal="DRAFT"
            defaultText="Player Name"
            handleSubmit={this.handleNewPick}
            isResponsive={this.state.isDraftStarted}
          />
        </div>
        <DraftTable
          teams={this.state.teamNames}
          picks={this.state.picks}
          nRounds={this.state.nRounds}
          onTeamMove={this.onTeamMove}
          isDraftStarted={this.state.isDraftStarted}
        />
      </>
    );
  }
}

function DraftTable(props) {
  // props: teams, nRounds

  // Generate column headings with the team names
  const teamsRow = props.teams.map( (teamName, ii) => {
    return (
      <TeamHeader
        key={ii}
        onTeamMove={props.onTeamMove}
        // onTeamDelete={props.onTeamDelete}
        teamName={teamName}
        iTeamName={ii}
        isDraftStarted={props.isDraftStarted}
      />
    );
  });

  // Create a new array of arrys representing a 2D array of draft results to display
  // Fill in missing picks with undefined
  const nTeams = props.teams.length;
  const draftArray = []; // Array of arrays. Each inner array is a row in the final table
  let snakeCol;
  let ii;

  for (let row = 0; row < props.nRounds; row++) {
    let rowArray = [];
    for (let col = 0; col < nTeams; col++) {

      // Pick index for props.picks
      ii = (row * nTeams) + col;

      // Fill rowArray in the order it will be displayed. Insert data at
      // specific indices including the snake draft
      snakeCol = row % 2 ? nTeams - col - 1 : col;
      if (props.picks[ii]) {
        rowArray[snakeCol] = props.picks[ii].playerName;
      } else {
        rowArray[snakeCol] = undefined;
      }
    }
    draftArray.push(rowArray);
  }

  // Map 2D draft array to row and data elements
  let draftTableRow;
  const allDraftRows =  draftArray.map( (rowArray, ii) => {
    draftTableRow = rowArray.map( (playerName, ii) => {
      return (
        // TODO change the key to the playerid?
        <td key={ii}>{playerName}</td>
      );
    });

    return (
      // TODO adjust the key? Currently round - 1 so probably ok
      <tr key={ii}>
        <td>{ii + 1}</td> {/*Insert the round number*/}
        {draftTableRow}
      </tr>
    );
  });

  return (
    <table className={styles.draftTable}>
      <thead>
        <tr>
          <th>Round</th>
          {teamsRow}
        </tr>
      </thead>
      <tbody>
        {allDraftRows}
      </tbody>
    </table>
  );

}


class TeamHeader extends React.Component {
  constructor(props) {
    super(props);

    this.onTeamDelete = this.onTeamDelete.bind(this);
    this.onTeamMoveLeft = this.onTeamMoveLeft.bind(this);
    this.onTeamMoveRight = this.onTeamMoveRight.bind(this);
  }

  onTeamDelete(e) {
    e.preventDefault(); // TODO might not be necessary for regular onclick
    this.props.onTeamMove(this.props.iTeamName, 0)
  }

  onTeamMoveRight(e) {
    e.preventDefault();
    this.props.onTeamMove(this.props.iTeamName, 1);
  }

  onTeamMoveLeft(e) {
    e.preventDefault();
    this.props.onTeamMove(this.props.iTeamName, -1);
  }

  render() {

    let teamButtons;

    if (this.props.isDraftStarted) {
      teamButtons = "";
    } else {
      teamButtons =
        <div className={adminStyles.manageTeamButtons}>
          <button type="button" className={adminStyles.moveArrow}
            onClick={this.onTeamMoveLeft}>&lt;</button>
          <button type="button" className={adminStyles.moveArrow}
            onClick={this.onTeamMoveRight}>&gt;</button>
          <button type="button" className={adminStyles.deleteTeamX}
            onClick={this.onTeamDelete}>x</button>
        </div>;
    }

    return (
      <th>
        {teamButtons}
        {this.props.teamName}
      </th>
    );
  }


}

