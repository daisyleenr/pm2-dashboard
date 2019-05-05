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

const Status = styled.div`
  color: ${({ status }) => (status === "online" ? "#2ecc71" : "#ff7979")};
  font-weight: bold;
`;

const Tag = styled.span`
  border-radius: 5px;
  padding: 0 4px;
  background-color: #dff9fb;
  color: #535c68;
  font-size: 12px;
  margin: 5px;
  font-weight: bold;
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
            <TableCell>No.</TableCell>
            <TableCell>PM2 ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Hostname</TableCell>
            <TableCell>App Name</TableCell>
            <TableCell>Args</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processes.map((process, i) => {
            const { key, pm_id, status, hostname, name, args } = process;
            const argTags = args.map((arg, i) => <Tag key={i}>{arg}</Tag>);
            this.ProcessItems[i] = React.createRef();

            return (
              <RootRef key={key} rootRef={this.ProcessItems[i]}>
                <TableRow key={key}>
                  <TableCell>{i}</TableCell>
                  <TableCell>{pm_id}</TableCell>
                  <TableCell>
                    <Status status={status}>{status}</Status>
                  </TableCell>
                  <TableCell>{hostname}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{argTags}</TableCell>
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
