import React from "react"

import DraftForm from "./draftForm.js"
import LeagueSelection from "./leagueSelection.js"

import * as styles from "../styles/adminbar.module.css"
import * as generalStyles from "../styles/generalStyles.module.css"


export default function AdminBar(props) {

  const buttonStyle =
      props.isDraftStarted ? generalStyles.draftButton : generalStyles.draftButtonOff;

  const notButtonStyle =
    props.isDraftStarted ? generalStyles.draftButtonOff : generalStyles.draftButton;

  return(
    <div className={styles.adminBar}>
      <h2>Admin</h2>
      <div className={styles.adminContents}>
        <LeagueSelection
          isResponsive={!props.isDraftStarted}
          leagues={props.leagues}
          onLeagueChange={props.onLeagueChange}
        />
        <DraftForm
          submitVal="ADD"
          defaultText="New Team"
          handleSubmit={props.handleNewTeam}
          isResponsive={!props.isDraftStarted}
        />
        <h3>Draft Controls</h3>
        <div className={styles.draftControls}>
          <button
            className={notButtonStyle}
            type="button"
            onClick={props.onBegin}
            disabled={props.isDraftStarted}>
            Begin Draft
          </button>
          <button
            className={buttonStyle}
            type="button"
            onClick={props.onReset}
            disabled={!props.isDraftStarted}>
            Configure Draft
          </button>
        </div>
        <div className={styles.draftControls}>
          <button
            className={buttonStyle}
            type="button"
            onClick={props.undoPick}
            disabled={!props.isDraftStarted}>
            Undo Pick
          </button>
          <button
            className={buttonStyle}
            type="button"
            disabled={!props.isDraftStarted}
            onClick={props.onSubmit}>
            Submit Draft
          </button>
        </div>
      </div>
    </div>
  );

}