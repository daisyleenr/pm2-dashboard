import React, { Component } from "react";
import styled from "styled-components";

const Item = styled.div`
  position: relative;
  background-color: ${({ status }) =>
    status === "online" ? "#2ecc71" : "#ff7979"};

  width: 20px;
  height: 20px;

  text-align: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  vertical-align: center;

  cursor: pointer;
`;

const Tooltip = styled.div`
  position: absolute;
  width: max-content;
  padding: 7px 7px;
  margin-top: -65px;
  margin-left: -10px;
  z-index: 999;

  text-align: center;
  background-color: #333333;
  color: white;
  font-size: 14px;
  font-weight: bold;

  border-radius: 6px;

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    margin-left: 15px;
    width: 0;
    height: 0;
    border-top: 8px solid #000000;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
  }
`;

const Arg = styled.span`
  padding: 0 4px;
  background-color: #dff9fb;
  color: #535c68;
  font-size: 12px;
  margin: 3px;
  font-weight: bold;
`;

class ProcessStatusChartItem extends Component {
  state = {
    isHover: false
  };

  render() {
    const { isHover } = this.state;
    const { idx, process, onClick } = this.props;
    const { hostname, name, status, args } = process;

    const argList = args.map((arg, i) => <Arg key={i}>{arg}</Arg>);

    return (
      <>
        <Item
          status={status}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={onClick}
          data-idx={idx}
        >
          {idx}
          {isHover && (
            <Tooltip>
              {hostname}: {name} {argList}
            </Tooltip>
          )}
        </Item>
      </>
    );
  }

  handleMouseEnter = e => {
    this.setState({
      isHover: true
    });
  };

  handleMouseLeave = e => {
    this.setState({
      isHover: false
    });
  };
}

export default ProcessStatusChartItem;
