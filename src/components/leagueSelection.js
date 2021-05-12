import React from "react"

import * as styles from "../styles/draftform.module.css"
import * as generalStyles from "../styles/generalStyles.module.css"

export default class LeagueSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
      selectedLeague: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({selectedLeague: event.target.value});
  }

  componentDidMount() {

    fetch("/api/leagues")
      .then(res => {
        return res.json();
      })
      .then( data => {
        const leagues = data.map( ({name}) => name );
        this.setState({
          leagues: leagues,
        });
      });

  }

  render() {

    console.log(this.state.leagues);

    const leagueOptions = this.state.leagues.map( league => {
      return (
        <option key={league} value={league} />
      );
    });

    const inputStyle = this.props.isResponsive ? generalStyles.draftText : generalStyles.draftTextOff;

    return (
      <form action="" className={styles.draftForm}>{/* TODO handle the action */}
        <input
          className={inputStyle}
          list="leagues"
          name="league"
          id="league"
          placeholder="Enter League Name"
          disabled={!this.props.isResponsive}
          value={this.state.selectedLeague}
          onChange={this.handleChange}
        />
        <datalist id="leagues">
          {leagueOptions}
        </datalist>
      </form>
    );

  }

}