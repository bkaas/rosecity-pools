import React from "react"

// TODO
// - Admin password allows for
//  - Add teams to the draft
//    - Re-arrange team order
//  - Undo button (undo last pick that continues to the beginning)

function Pick(roundNo, pickNo, overallPickNo, teamName, playerid, playerName, playerLogo) {
  this.roundNo       = roundNo;
  this.pickNo        = pickNo;
  this.overallPickNo = overallPickNo;
  this.teamName      = teamName;
  this.playerid      = playerid;
  this.playerName    = playerName;
  this.playerLogo    = playerLogo;
}

// function Team() {
//   this.teamName = '';
//   this.picks    = [];
// }


export default class DraftMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teamNames:    [], // Array of strings for each team name in the draft order
      picks:        [], // Stores an array of Pick() objects
      roundNo:      [], // Current round of the draft, starts at 1
      pickNo:       [], // Current pick number within the round, starts at 1
      nRounds:       8, // Number of rounds in the draft
      nextPickTeam: '', // Team name that picks next
    };

    this.handleNewTeam = this.handleNewTeam.bind(this);
    this.handleNewPick = this.handleNewPick.bind(this);
    this.undoPick = this.undoPick.bind(this);
  }

  handleNewTeam(teamName) {
    console.log("Added new team!");
    console.log(teamName);
    // this.setState({
    //   teamNames: teamName,
    // });
    this.setState( state => {
      return state.teamNames.push(teamName);
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
      newPick.teamName = state.nextPickTeam;

      const endOfRound = state.pickNo === state.teamNames.length;
      const roundNo    = endOfRound ? state.roundNo + 1 : state.roundNo;
      const pickNo     = endOfRound ? 1 : state.pickNo + 1;

      // Reverse the draft order for even round numbers to implement the snake draft.
      const iPick = roundNo % 2 > 0 ? pickNo : state.teamNames.length - pickNo;

      return ({
        picks:        [...state.picks, newPick],
        roundNo:      roundNo,
        pickNo:       pickNo,
        nextPickTeam: state.teamNames[iPick],
      });

    });
  }

  undoPick() {
    // TODO
    // Revert the last pick
  }


  render() {

    return (
      <>
        <h2>This is the draft page!</h2>
        <DraftForm
          label="New Team:"
          submitVal="Add"
          handleSubmit={this.handleNewTeam}
        />
        <DraftForm
          label="Player:"
          submitVal="Draft"
          handleSubmit={this.handleNewPick}
        />
        <DraftTable
          teams={this.state.teamNames}
          picks={this.state.picks}
          nRounds={this.state.nRounds}
        />
      </>
    );
  }

}

// class AdminBar extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {value: ""}
//   }

// }

function DraftTable(props) {
  // props: teams, nRounds

  // Generate column headings with the team names
  const teamsRow = props.teams.map( (teamName, ii) => {
    return (
      <th key={ii}>{teamName}</th>
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
        {draftTableRow}
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          {teamsRow}
        </tr>
      </thead>
      <tbody>
        {allDraftRows}
      </tbody>
    </table>
  );

}


// Controlled component
// Ref: https://reactjs.org/docs/forms.html
class DraftForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitWrapper = this.handleSubmitWrapper.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmitWrapper(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({value: ""});
  }

  render() {

    return (

      // TODO adjust className, input id names etc. to be more generic
      <form className="draftInput" onSubmit={this.handleSubmitWrapper}>
        <label htmlFor="draftedPlayer">{this.props.label}</label>
        <br/>
        <input type="text" id="draftedPlayer" name="draftedPlayer"
          value={this.state.value} onChange={this.handleChange}/>
        <br/>
        <input type="submit" value={this.props.submitVal}/>
      </form>

    );

  }

}

