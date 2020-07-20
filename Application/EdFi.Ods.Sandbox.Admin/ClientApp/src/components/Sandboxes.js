import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSandboxes, selectSandboxes } from '../slices/sandboxesSlice';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export const Sandboxes = () => {
  const dispatch = useDispatch();
  const { sandboxes, loading, hasErrors } = useSelector(selectSandboxes);

  useEffect(() => {
    dispatch(getAllSandboxes());
  }, [dispatch]); //componentDidMount

  const renderSandboxes = () => {
    if (loading)
      return (
        <TableRow>
          <TableCell>Loading sandboxes...</TableCell>
        </TableRow>
      );

    if (hasErrors)
      return (
        <TableRow>
          <TableCell>Cannot load sandboxes...</TableCell>
        </TableRow>
      );

    return sandboxes.map((sandbox, index) => (
      <TableRow key={index} hover>
        <TableCell>{sandbox.owner}</TableCell>
        <TableCell>{sandbox.name}</TableCell>
        <TableCell>{sandbox.apiKey}</TableCell>
        <TableCell>{sandbox.databaseName}</TableCell>
        <TableCell>{sandbox.isOrphan}</TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
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
        <TableBody>{renderSandboxes()}</TableBody>
      </Table>
    </TableContainer>
  );
};
