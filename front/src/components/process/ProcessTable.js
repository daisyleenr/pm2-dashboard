import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import RootRef from "@material-ui/core/RootRef";

import styled from "styled-components";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const StyledTableCell = styled(TableCell)`
  && {
    width: 10px;
    padding: 4px 10px 4px 10px;
    font-weight: 500;
    font-size: 16px;
  }
`;

const NumberCell = styled(TableCell)`
  && {
    width: 10px;
    padding: 4px 10px 4px 10px;
    text-align: center;
    color: rgba(132, 132, 132, 0.87);
  }
`;

const Status = styled.div`
  color: ${({ status }) => (status === "online" ? "#4CAF50" : "#FF5722")};
  font-weight: bold;
`;

const Tag = styled.span`
  border-radius: 5px;
  padding: 3px 8px;
  background-color: #607d8b;
  color: #fff;
  font-size: 12px;
  margin: 5px;
  font-weight: bold;
  white-space: nowrap;
`;

class ProcessTable extends Component {
  ProcessItems = [];
  handleScrollTo = key => {
    this.ProcessItems[key].current.scrollIntoView();
  };

  render() {
    const { processes } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            <NumberCell>No.</NumberCell>
            <StyledTableCell>hostname</StyledTableCell>
            <StyledTableCell>App name</StyledTableCell>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell>status</StyledTableCell>
            <StyledTableCell>args</StyledTableCell>
            <StyledTableCell>restart</StyledTableCell>
            <StyledTableCell>uptime</StyledTableCell>
            <StyledTableCell>cpu</StyledTableCell>
            <StyledTableCell>mem</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processes.map((process, i) => {
            const {
              key,
              pm_id,
              status,
              hostname,
              name,
              args,
              restart,
              uptime,
              cpu,
              memory
            } = process;
            const argTags = args.map((arg, i) => <Tag key={i}>{arg}</Tag>);
            this.ProcessItems[i] = React.createRef();

            return (
              <RootRef key={key} rootRef={this.ProcessItems[i]}>
                <TableRow key={key}>
                  <NumberCell>{i}</NumberCell>
                  <StyledTableCell>{hostname}</StyledTableCell>
                  <StyledTableCell>{name}</StyledTableCell>
                  <StyledTableCell>{pm_id}</StyledTableCell>
                  <StyledTableCell>
                    <Status status={status}>{status}</Status>
                  </StyledTableCell>
                  <StyledTableCell>{argTags}</StyledTableCell>
                  <StyledTableCell>{restart}</StyledTableCell>
                  <StyledTableCell>{uptime}</StyledTableCell>
                  <StyledTableCell>{cpu}</StyledTableCell>
                  <StyledTableCell>{memory}</StyledTableCell>
                </TableRow>
              </RootRef>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(ProcessTable);
