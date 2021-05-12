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
        />
        <DraftForm
          submitVal="ADD"
          defaultText="New Team"
          handleSubmit={props.handleNewTeam}
          isResponsive={!props.isDraftStarted}
        />
        <h3>Draft Controls</h3>
        <button
          className={notButtonStyle}
          type="button"
          onClick={props.onBegin}
          disabled={props.isDraftStarted}>
          Begin Draft
        </button>
        <button
          className={generalStyles.draftButton /* Always enabled */}
          type="button"
          onClick={props.onReset}>
          Reset Draft
        </button>
        <br/>
        <button
          className={buttonStyle}
          type="button"
          onClick={props.undoPick}
          disabled={!props.isDraftStarted}>
          Undo Pick
        </button>
        <br/>
        <button
          className={buttonStyle}
          type="button"
          disabled={!props.isDraftStarted}>
          Submit Draft
        </button>
      </div>
    </div>
  );

}