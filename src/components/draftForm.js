import React from "react"
import * as styles from "../styles/draftform.module.css"
import * as generalStyles from "../styles/generalStyles.module.css"

export default class DraftForm extends React.Component {
// Controlled component
// Ref: https://reactjs.org/docs/forms.html

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

    // const formStyle = this.props.isResponsive ? styles.draftForm : styles.draftFormOff;
    const buttonStyle =
      this.props.isResponsive ? generalStyles.draftButton : generalStyles.draftButtonOff;
    const textStyle =
      this.props.isResponsive ? generalStyles.draftText : generalStyles.draftTextOff;

    // Include more than 1 classname
    // className={`${formStyle} ${buttonStyle}`}

    return (

      // TODO adjust className, input id names etc. to be more generic
      <form
        className={styles.draftForm}
        onSubmit={this.handleSubmitWrapper}
      >
        {/*<div className={styles.inputContainer}>*/}
          <input
            className={textStyle}
            type="text"
            id="draftedPlayer"
            name="draftedPlayer"
            placeholder={this.props.defaultText}
            value={this.state.value}
            onChange={this.handleChange}
            disabled={!this.props.isResponsive}
          />
          <input
            className={buttonStyle}
            type="submit"
            value={this.props.submitVal}
            disabled={!this.props.isResponsive}
          />
        {/*</div>*/}
      </form>

    );

  }

}