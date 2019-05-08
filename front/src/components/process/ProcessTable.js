import React, { Component } from "react";
import moment from "moment";

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
    padding: 4px 2px 4px 2px;
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

const Uptime = styled.div`
  color: ${({ uptime }) => {
    const currentTime = new Date().getTime();
    const offset = currentTime - uptime;
    return offset < 86400000 ? "#FF9800" : "rgba(0, 0, 0, 0.87)";
  }};
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

const stringFromByteCount = bytes => {
  const idx = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (bytes / Math.pow(1024, idx)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][idx]
  );
};

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "a few seconds",
    ss: "%ds",
    m: "a minute",
    mm: "%dm",
    h: "an hour",
    hh: "%dh",
    d: "a day",
    dd: "%dD",
    M: "a month",
    MM: "%dM",
    y: "a year",
    yy: "%dY"
  }
});

class ProcessTable extends Component {
  ProcessItems = [];
  handleScrollTo = key => {
    this.ProcessItems[key].current.scrollIntoView();
  };

  render() {
    console.log(moment.utc());
    const { processes } = this.props;

    const createRows = processes.map((process, i) => {
      this.ProcessItems[i] = React.createRef();

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
            <StyledTableCell>
              {args.map((arg, i) => (
                <Tag key={i}>{arg}</Tag>
              ))}
            </StyledTableCell>
            <StyledTableCell>{restart}</StyledTableCell>
            <StyledTableCell>
              <Uptime uptime={uptime}>
                {moment(Number(uptime)).fromNow()}
              </Uptime>
            </StyledTableCell>
            <StyledTableCell>{cpu}%</StyledTableCell>
            <StyledTableCell>{stringFromByteCount(memory)}</StyledTableCell>
          </TableRow>
        </RootRef>
      );
    });

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
        <TableBody>{createRows}</TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(ProcessTable);
