import React, { Component } from "react";

import MuiAutocomplete from "@material-ui/lab/Autocomplete";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onInputChange } = this.props;
    this.setState({ onInputChange });
  }

  handleAutocompleteChange = async (event, newValue) => {
    if (this.state.onInputChange) this.state.onInputChange(event, newValue);
  };

  render() {
    return (
      <MuiAutocomplete
        onInputChange={this.handleAutocompleteChange}
        freeSolo={this.props.freeSolo}
        disableClearable={this.props.disableClearable}
        blurOnSelect={this.props.blurOnSelect}
        fullWidth={this.props.fullWidth}
        style={this.props.styles}
        options={this.props.options || []}
        getOptionLabel={this.props.getOptionLabel}
        renderInput={this.props.renderInput}
      />
    );
  }
}

export default Select;
