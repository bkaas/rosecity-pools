import React from "react"

import Layout from "../components/layout.js"
import Dropdown from "../components/dropdown.js"
import teamIcons from "../components/teamIcons.js"
import * as styles from "../styles/teams.module.css"

function TeamTableEntries(props) {

  // const logo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 640" id="team-19-20202021-light" width="30"><path fill="#041E42" d="M461.02 570.855v11.825h-2.956v-11.825h-3.423v-2.937h9.802v2.937h-3.422zm16.024 11.825v-8.713l-2.49 5.428h-2.612l-2.49-5.428v8.713h-2.956v-14.762h2.956l3.796 7.883 3.796-7.883H480v14.762h-2.957z"></path><path fill="#041E42" d="M830.31 40H251.4c38.347 59.818 51.096 79.49 18.481 78.554L221.79 40h-92.1l209.192 341.732c-2.818-.116-5.677-.291-8.458-.291-85.747 0-152.913 47.996-152.913 109.287 0 61.276 67.166 109.272 152.913 109.272 85.751 0 152.921-47.996 152.921-109.272 0-15.509-4.321-30.453-12.842-44.44l-46.88-76.568s37.738 7.584 66.057-5.497l-13.667-17.6s57.533 5.337 110.54-10.463l-17.97-19.052s80.679-2.054 136.596-73.784h-5.575s41.648-20.09 59.203-64.515h-5.425s26.691-19.871 35.782-60.711h-7.87S823.694 88.206 830.31 40z"></path><path fill="#FFF" d="M815.99 50.086H270.156c44.724 67.765 31.528 78.68-5.865 78.68l-48.161-78.68h-68.427l210.186 343.37c-8.979-1.192-18.115-1.925-27.465-1.925-80.09 0-142.817 43.568-142.817 99.197 0 55.614 62.727 99.17 142.817 99.17 80.091 0 142.83-43.556 142.83-99.17 0-13.628-3.82-26.807-11.373-39.178l-59.516-97.223s41.4 13.635 70.416 4.585l-18.338-23.62s68.355 5.68 114.066-3.553l-21.75-23.07s101.798-1.012 139.788-63.872h-17.425s47.99-6.698 72.213-58.537h-17.742s41.299-19.026 52.501-62.299h-19.168s42.867-28.459 59.064-73.875z"></path><path fill="#FFB81C" d="M804.596 57.177H282.8c30.916 47.063 36.793 81.718-22.604 78.466l-48.04-78.466H160.35l211.781 345.95a195.42 195.42 0 00-41.706-4.51c-74.841 0-135.732 41.31-135.732 92.11 0 50.768 60.89 92.089 135.732 92.089 74.85 0 135.747-41.321 135.747-92.088 0-12.304-3.473-24.241-10.334-35.483l-68.987-112.71s43.478 15.203 73.546 12.017c0 0-13.637-16.878-19.72-27.368 0 0 49.474 5.947 114.091.31l-24.24-25.71c1.98.041 4.088.071 6.362.071 104.817 0 136.382-53.72 136.382-53.72h-28.564s70.782-18.037 85.91-58.54H704.37s55.997-27.452 61.467-58.548H733.88s55.838-31.512 70.716-73.87z"></path><path fill="#003087" d="M792.512 64.694h-496.3c41.131 67.185-.055 82.312-40.366 78.241L207.95 64.694h-34.187l214.595 350.558c-17.405-5.82-37.082-9.125-57.933-9.125-70.82 0-128.227 37.872-128.227 84.6 0 46.707 57.407 84.572 128.227 84.572s128.224-37.865 128.224-84.571c0-11.164-3.282-21.81-9.234-31.579L369.866 329.2s51.392 17.832 75.107 17.832c0 0-10.802-13.77-17.32-28.596 0 0 61.562 6.636 110.869 2.784l-26.809-28.422s7.996 1.545 25.176 1.545c86.756 0 120.011-38.688 120.011-38.688H398.933l-3.771-6.162H609.2s87.22-16.659 108.271-52.383H363.09l-3.767-6.153H685.51s60.726-29.309 69.45-52.387H327.258l-3.772-6.168H716.56s57.278-29.793 75.953-67.707z"></path></svg>
  // console.log(typeof logo)
  // // const player = props.playerFirstname + ' ' + props.playerLastname;
  // console.log("Teamtableentries:");
  // console.log(props);
  // console.log(typeof props.team.stats[0].logo);

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

export default class TeamGrid extends React.Component {

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
    };

    // this.sortOptions = ['Alphabetical', 'Draft Order', 'Standings'];
    this.sortOptions = ['Alphabetical', 'Draft Order', 'Standings'];

    this.assembleStandingsData = this.assembleStandingsData.bind(this);
    this.onSortSelect = this.onSortSelect.bind(this);
  }

  componentDidMount() {

    fetch("/api/stats")
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


    return (
      <Layout>
        <div className={styles.standingsBar}>
          <button>Standings</button>{/* TODO This probably doesn't need to be a button */}
        </div>
        <div className={styles.standingsDropdown}>
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
      </Layout>
    );
  }
}