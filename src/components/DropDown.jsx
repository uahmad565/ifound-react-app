// import React, { useState } from 'react';
import React, { Component } from "react";
import { ThemeProvider } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import './DropDown.scss';

export default class DropDown extends Component {

  change = (eventkey) => {
    const { dropDownChange } = this.props;
    dropDownChange(eventkey);
  };

  render() {
    const { label } = this.props;
    const { list } = this.props;
    return (
      <div>
        <ThemeProvider prefixes={{ "btn": 'my-btn' }}>
          <Dropdown variant="default" bsPrefix={{ background: "white" }} onSelect={this.change}>
            <Dropdown.Toggle id="dropdown-basic">
              {label}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="secondary">
              {list.map((l, i) => {
                return (<Dropdown.Item key={i} eventKey={l}>{l}</Dropdown.Item>)
              })}
            </Dropdown.Menu>
          </Dropdown>
        </ThemeProvider>

      </div>
    );
  }
}
