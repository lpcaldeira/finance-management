import React, { Component } from "react";

import ReactCurrencyInput from "react-currency-input";

class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { value, onChangeEvent } = this.props;
    this.setState({ value, onChangeEvent });
  }

  handleChange = async (e) => {
    this.setState({
      value: e.target.value,
    });
    if (this.state.onChangeEvent) this.state.onChangeEvent(e);
  };

  render() {
    const { value } = this.props || this.state;
    return (
      <ReactCurrencyInput
        value={value}
        disabled={this.props.disabled}
        ref={this.props.ref}
        onChangeEvent={this.handleChange}
        decimalSeparator={this.props.decimalSeparator}
        thousandSeparator={this.props.thousandSeparator}
        precision={this.props.precision}
        prefix={this.props.prefix}
        style={this.props.styles}
      />
    );
  }
}

export default CurrencyInput;
