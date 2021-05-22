import React from "react"

import Layout from "../components/Layout.js"
import Dropdown from "../components/Dropdown.js"
import teamIcons from "../components/TeamIcons.js"
import * as styles from "../styles/teams.module.css"

export default function TeamsPage() {

  return (
    <Layout>
      <TeamGrid />
    </Layout>
  );

}


class TeamGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      team: [{ // array of team objects
        name: '',
        stats: [{ // array of stats objects
          lastname: '',
          firstname: '',
          points: '',
          logo: '',
          pick: '', // added for sorting teams by draft position
        }],
      }],
      sortIndex: 1, // Default to draft order sort
      isStandingsDropdownVisible: false,
    };

    // this.sortOptions = ['Alphabetical', 'Draft Order', 'Standings'];
    this.sortOptions = ['Alphabetical', 'Draft Order', 'Standings'];

    this.assembleStandingsData = this.assembleStandingsData.bind(this);
    this.onSortSelect = this.onSortSelect.bind(this);
    this.onStandingsDropdownClick = this.onStandingsDropdownClick.bind(this);
  }

  componentDidMount() {

    let fetchUrl;
    if (process.env.GATSBY_API_URL) {
      fetchUrl = process.env.GATSBY_API_URL + "/api/stats";
    }
    else {
     fetchUrl = "/api/stats";
    }

    fetch(fetchUrl)
      .then(res => {
        // console.log(res);
        // console.log(res.body);
        return res.json();

      })
      .then(data => {
        this.setState({
          team: data,
        })

        // Sort the teams when they first mount
        this.onSortSelect(this.sortOptions[this.state.sortIndex]);
      });

  }

  assembleStandingsData() {
  // Create object that is similar to the "state" object in structure
  // Pass the object into the Team component for standings
  // The "name" of the team will be "Standings"
  // The stats will be each team name and their total points


    const standingsData = this.state.team.map( team => {

      const teamTotalPoints = team.stats.reduce((sum, stat) => {
        return sum + stat.points;
      }, 0);

      return ({
        firstname: team.name,
        lastname:  "",
        points:    teamTotalPoints,
        logo:      false,
      });
    });

    standingsData.sort((a, b) => {
      return b.points - a.points;
    });

    return ({
      name: "Standings",
      stats: standingsData,
    });

  }

  onSortSelect(selectedOption) {

    const standingsData = this.assembleStandingsData();
    // Set the sort order
    let sortCallback;
    switch(this.sortOptions.indexOf(selectedOption)) {
      case 0: // Alphabetical
        sortCallback = (teamA, teamB) => {
          const nameTeamA = teamA.name.toUpperCase();
          const nameTeamB = teamB.name.toUpperCase();
          return (nameTeamA < nameTeamB) ? -1 : (nameTeamA > nameTeamB) ? 1 : 0;
        };
        break;
      case 1: // Draft Order
        sortCallback = (teamA, teamB) => {
          return teamA.stats[0].pick - teamB.stats[0].pick; // Subtract the first round pick numbers
        };
        break;
      case 2: // Standings
      default:
        // Copy the standingsData order
        const standingsTeamOrder = standingsData.stats.map( ({firstname}) => firstname );
        sortCallback = (teamA, teamB) => {
          return standingsTeamOrder.indexOf(teamA.name) - standingsTeamOrder.indexOf(teamB.name);
        };
    }

    this.setState( (state) => {
      return ({
        team: state.team.sort(sortCallback),
      });
    });
  }

  onStandingsDropdownClick() {
    this.setState((state) => {
      return ({
        isStandingsDropdownVisible: !state.isStandingsDropdownVisible,
      });
    });
  }

  render() {

    // Create standings table
    const standingsData = this.assembleStandingsData();
    // console.log(standingsData);


    // this.state.team

    // TODO revisit this block
    // console.log('this.state.team');
    // console.log(this.state.team);
    let teams;
    if (!this.state.team.length) {
      teams = <p>No data for this league and year</p>;
    }
    else {

      if (this.state.team[0].stats.length === 1) {
        return null;
      }

      teams = this.state.team.map( (team, ii) => {
        return (
          <Team key={ii} teamData={team} />
        );
      });

    }

    const standingsDropdownClass = this.state.isStandingsDropdownVisible ?
      `${styles.standingsDropdown} ${styles.visible}` : styles.standingsDropdown;

    return (
      <>
        <div className={styles.standingsBar}>
          <button onClick={this.onStandingsDropdownClick}>
            Standings
          </button>
        </div>
        <div className={standingsDropdownClass}>
          <Team
            teamData={standingsData}
            teamType="standings"
          />
        </div>
        <div className={styles.teamsMain}>

          <div className={styles.standingsPane}>
            <Team teamData={standingsData} teamType="standings"/>
          </div>

          <div className={styles.teamsPane}>
            <div className={styles.sortBar}>
              <Dropdown
                selectId="sortBy"
                label="Sort By:"
                selectName="sortBy"
                options={this.sortOptions}
                onSelect={this.onSortSelect}
                initialSelect={this.sortOptions[this.state.sortIndex]}
              />
            </div>
            <div className={styles.teamGrid}>
              {teams}
            </div>
          </div>

        </div>
      </>
    );
  }
}


function Team(props) {

  let totalPoints;
  let totalPointsElement;
  if (!props.teamType) {
    totalPoints = props.teamData.stats.reduce((sum, stat) => {
      return sum + stat.points;
    }, 0);

    totalPointsElement = <h3 className={styles.tableHeaderPts}>{totalPoints}</h3>;
  }
  else {
    totalPointsElement = '';
  }

  const teamContainerClass = props.teamType ? `${styles.teamContainer} ${styles.standingsContainer}` : styles.teamContainer;

  return (
    <div className={teamContainerClass}>
      <div className={styles.teamBackground}>
        <div className={styles.tableHeader}>
          <h3>{props.teamData.name}</h3>
          {totalPointsElement}
        </div>
        <TeamTable stats={props.teamData.stats} teamType={props.teamType}/>
      </div>
    </div>
  );
}


function TeamTable(props) {

  let headings;
  if (props.teamType) {
    headings = ["", "", ""];
  }
  else {
    headings = ["", "Player", "Pts"];
  }

  const htmlHeadings = headings.map( (heading, ii) => <th key={ii}>{heading}</th> );

  return (
    <table>
      <tbody>
        <tr>
          {htmlHeadings}
        </tr>
        <TeamTableEntries stats={props.stats} teamType={props.teamType}/>
      </tbody>
    </table>
  );
}


function TeamTableEntries(props) {

  return (
    props.stats.map( (stats, ii) => {
      const playername = (stats.firstname + ' ' + stats.lastname).toLowerCase();

      let logo;
      if (props.teamType) {
        logo = ii + 1;
      }
      else {
        if (stats.logo) {
          logo = teamIcons[stats.logo.slice(0, -4)];
        } else {
          logo = '';
        }
      }

      return(
        <tr key={ii}>
          {/*<td dangerouslySetInnerHTML={{__html: stats.logo}}/>*/}
          {/*TODO: Setting the names to lowercase here so I can capitalize in css*/}
          <td>{logo}</td>
          <td>
            {/*{teamIcons.newyorki}*/}
            {playername}
          </td>
          <td>{stats.points}</td>
        </tr>
      );
    })
  );
}
