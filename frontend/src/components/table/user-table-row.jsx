import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, Checkbox } from "@mui/material";

const UserTableRow = ({ row, index, isSelected, handleClick }) => {
  const isItemSelected = isSelected(row.id);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      sx={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell align="right">{row.id}</TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.name}
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.email}
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.status}
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.lastLoginedAt}
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.createdAt}
      </TableCell>
    </TableRow>
  );
};

UserTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default UserTableRow;
