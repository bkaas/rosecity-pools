import React from "react";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      selectedOption: this.props.initialSelect,
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e) {
    // TODO prevent default here?
    this.props.onSelect(e.target.value);
    this.setState({
      selectedOption: e.target.value
    });
  }

  render() {

    const options = this.state.options.map( (options, ii) => {
      return <option key={ii} value={options}>{options}</option>
    });

    return (
      <>
        <label htmlFor={this.props.selectId}>{this.props.label}</label>
        <select
          name={this.props.selectName}
          id={this.props.selectId}
          onChange={this.onSelect}
          value={this.state.selectedOption}
        >
          {options}
        </select>
      </>

    );

  }


}