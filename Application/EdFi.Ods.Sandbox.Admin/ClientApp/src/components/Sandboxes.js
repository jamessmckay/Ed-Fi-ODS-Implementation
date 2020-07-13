import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/sandboxActions';
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

const Sandboxes = ({ ...props }) => {
  useEffect(() => {
    props.fetchAllSandboxes();
  }, []); //componentDidMount

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <h3>Sandboxes</h3>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vendor Name</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Api Key</TableCell>
                  <TableCell>Database</TableCell>
                  <TableCell>IsOrphan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.sandboxes.map((sandbox, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{sandbox.owner}</TableCell>
                      <TableCell>{sandbox.name}</TableCell>
                      <TableCell>{sandbox.apiKey}</TableCell>
                      <TableCell>{sandbox.databaseName}</TableCell>
                      <TableCell>{sandbox.isOrphan}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    sandboxes: state.sandboxReducers.sandboxes,
  };
};

const mapActionToProps = {
  fetchAllSandboxes: () => actions.fetchAll(),
};

export default connect(mapStateToProps, mapActionToProps)(Sandboxes);
