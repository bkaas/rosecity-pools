// Autocomplete component
// Adapted from:
// Ref: https://www.digitalocean.com/community/tutorials/react-react-autocomplete
import React from "react"

import * as styles from "../styles/draftform.module.css"
import * as generalStyles from "../styles/generalStyles.module.css"
import * as suggestionStyles from "../styles/suggestionList.module.css"

export default class AutoComplete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion:     -1,
      filteredSuggestions:  [], // Array of objects with fields name, logo, playerid
      showSuggestions:      false,
      typedInput:           "", // contains the user typed input
      suggestedInput:       "", // contains the selected input
      selectedPlayer:       0,
    };

    this.numSuggestions = 10;

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleSubmitWrapper = this.handleSubmitWrapper.bind(this);
  }

  onChange(e) {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = this.props.suggestions.filter(
      suggestion =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion:     -1,
      filteredSuggestions,
      showSuggestions:      true,
      typedInput:           e.currentTarget.value,
      suggestedInput:       "",
    });
  }

  onClick(e) {
    this.setState({
      activeSuggestion:     -1,
      filteredSuggestions:  [],
      showSuggestions:      false,
      suggestedInput:       e.currentTarget.innerText,
      selectedPlayer:       e.currentTarget.getAttribute("playerid"),
    });
  }

  handleSubmitWrapper(e) {
    console.log("form submitted");
    e.preventDefault();
    const playerName = this.state.suggestedInput ? this.state.suggestedInput : this.state.typedInput;
    this.props.handleSubmit(playerName, this.state.selectedPlayer);

    // Clear state
    this.setState({
      activeSuggestion:    -1,
      filteredSuggestions: [],
      showSuggestions:     false,
      typedInput:          "",
      suggestedInput:      "",
      selectedPlayer:      0,
    });
  }

  onKeyDown(e) {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // Pressed enter
    if (e.keyCode === 13) {
      // If the suggestion menu is not open, enter should submit the form
      console.log("Pressed Enter");

      // If we're not showing suggestions, just let the onSubmit method run
      if (!this.state.showSuggestions) {
        return;
      }

      // If we're showing suggestions, select the highlighted one
      if (filteredSuggestions[activeSuggestion]) {
        this.setState({
          activeSuggestion: -1,
          showSuggestions:  false,
          suggestedInput:   filteredSuggestions[activeSuggestion].name,
          selectedPlayer:   filteredSuggestions[activeSuggestion].playerid,
        });
      }

    }

    // Up arrow
    else if (e.keyCode === 38) {
      console.log("Pressed up arrow");
      console.log(activeSuggestion);

      // TODO Can the state be read outside of setState here? Async updates to state could mess with it?
      if (this.state.activeSuggestion === -1) {
        return;
      }

      this.setState( state => {
        // Show user typed input
        if (state.activeSuggestion === 0) {
          return ({
            activeSuggestion: -1,
            suggestedInput: "",
          });
        }
        // Update input to the suggeted input and decrement the active suggestion
        else if (state.filteredSuggestions[state.activeSuggestion - 1]) {
          return ({
            activeSuggestion: state.activeSuggestion - 1,
            suggestedInput:   state.filteredSuggestions[state.activeSuggestion - 1].name,
          });
        }
      });
    }

    // Down arrow, increment the index
    else if (e.keyCode === 40) {
      console.log("Pressed down arrow");
      console.log(activeSuggestion);

      // TODO Can the state be read outside of setState here? Async updates to state could mess with it?
      if (this.state.activeSuggestion + 1 === this.state.filteredSuggestions.length) {
        return;
      }

      this.setState( state => {
        if (state.filteredSuggestions[activeSuggestion + 1]) {
          return({
            activeSuggestion: state.activeSuggestion + 1,
            suggestedInput:   state.filteredSuggestions[activeSuggestion + 1].name,
          });
        }
      });
    }

    // Pressed ESC
    else if (e.keyCode == 27) {
      // First ESC click: Clear suggested input and suggestions menu
      // Second ESC click: Clear typed input altogether

      this.setState(state => {

        if (state.showSuggestions) {
          return ({
            showSuggestions: false,
            suggestedInput:  "",
          });
        }
        else {
          return ({
            suggestedInput: "",
            typedInput:     "",
          });
        }
      });
    }
  }


  render() {

    console.log("Render");

    const buttonStyle =
      this.props.isDraftStarted ? generalStyles.draftButton : generalStyles.draftButtonOff;

    const textStyle =
      this.props.isDraftStarted ? generalStyles.draftText : generalStyles.draftTextOff;

    const {
      onChange,
      onClick,
      onKeyDown,
      handleSubmitWrapper,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        typedInput,
        suggestedInput,
      }
    } = this;

    const inputText = suggestedInput ? suggestedInput : typedInput;

    let suggestionsListComponent;

    if (showSuggestions && typedInput) {
      if (filteredSuggestions.length) {

        suggestionsListComponent = (
          <ul className={suggestionStyles.suggestions}>
            {filteredSuggestions.slice(0, this.numSuggestions).map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = suggestionStyles.suggestionActive;
              } else {
                className = "";
              }
              return (
                <li
                  className={className}
                  key={index}
                  playerid={suggestion.playerid}
                  onClick={onClick}
                >
                  {suggestion.logo}{suggestion.name}
                </li>
              );

            })}
          </ul>
        );

      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

    return (
      <form
        className={styles.draftForm}
        onSubmit={handleSubmitWrapper}
      >
        <input
          className={`${textStyle} ${suggestionStyles.textInput}`}
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputText}
          disabled={!this.props.isDraftStarted}
        />
        <input
          type="submit"
          className={buttonStyle}
          value="DRAFT"
          disabled={!this.props.isDraftStarted}
        />
        {suggestionsListComponent}
      </form>
    );

  }

}