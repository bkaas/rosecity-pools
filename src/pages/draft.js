import React from "react"
import Layout from "../components/layout.js"

export default function Draft() {

  // To be pulled from the users in the live draft
  const teams = ["Brendan", "Ryan", "Darren", "Trent", "Adam", "Mak", "PA", "Colton"];

  return (
    <Layout>
      <h2>This is the draft page!</h2>
      <DraftForm/>
      <DraftTable teams={teams} nRounds={10}/>
    </Layout>
  );

}

function DraftTable(props) {
  // props: teams, nRounds

  // Generate column headings with the team names
  const teams = props.teams.map( (teamname, ii) => {
    return (
      <th key={ii}>{teamname}</th>
    );
  });

  // Generate the rows and columns based on the number
  // of rounds and teams respectively
  //
  // Generate columns:
  const cell = <td>""</td>;
  const cols = [cell];
  for (let ii = 0; ii < props.teams.length; ii++) {
    // cols.push(<td key={ii}></td>);
    cols.push(cell);
  }
  console.log(props.teams.length)
  console.log(cols);

  // Generate row
  const rowData = <tr>{cols}</tr>;
  const rows = [rowData];
  for (let ii = 0; ii < props.nRounds; ii++) {
    rows.push(rowData);
  }


  return (
    <table>
      <thead>
        {teams}
      </thead>
      <tbody>
        {rows}
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault(); //TODO look into this
  }

  render() {

    return (

      <form className="draftInput" onSubmit={this.handleSubmit}>
        <label htmlFor="draftedPlayer">Player:</label>
        <br/>
        <input type="text" id="draftedPlayer" name="draftedPlayer"
          value={this.state.value} onChange={this.handleChange}/>
        <br/>
        <input type="submit" value="Draft"/>
      </form>

    );

  }

}

