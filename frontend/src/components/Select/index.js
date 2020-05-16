import React, { Component } from "react";

import { MuiStyles } from "./styles";

import MuiSelect from "@material-ui/core/Select";
import MuiMenuItem from "@material-ui/core/MenuItem";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { selectValue, defaultValue, menuItems, onChange } = this.props;
    this.setState({ selectValue, defaultValue, menuItems, onChange });
  }

  handleChange = async (e) => {
    this.setState({
      selectValue: e.target.value,
    });
    if (this.state.onChange) this.state.onChange(e);
  };

  render() {
    const { selectValue } = this.state || this.props;
    const { menuItems } = this.props || [];
    return (
      <MuiSelect
        variant={this.props.variant}
        value={selectValue || this.props.defaultValue}
        onChange={this.handleChange}
        label={this.props.label}
        defaultValue={this.props.defaultValue}
        style={({ ...this.props.styles }, MuiStyles.select)}
      >
        {menuItems.map((item) => {
          return (
            <MuiMenuItem
              style={MuiStyles.menuItem}
              key={item.value}
              value={item.value}
            >
              {item.label}
            </MuiMenuItem>
          );
        })}
      </MuiSelect>
    );
  }
}

export default Select;
