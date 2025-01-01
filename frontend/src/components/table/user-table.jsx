import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import Context from "../../contexts/user-context";
import { stableSort, getComparator } from "./sort";
import {
  deleteById,
  getAll,
  blockById,
  activateById,
} from "../../http/user-api";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UserTableRow from "./user-table-row";
import UserTableHead from "./user-table-head";

const UserTable = observer(() => {
  const { userStore } = useContext(Context);
  const rows = userStore.getUsers();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          />
        )}

        {numSelected > 0 && (
          <Stack direction="row">
            <Tooltip title="Remove selected users">
              <IconButton
                onClick={() => {
                  deleteById(selected);
                  alert("Data synchronization...");

                  getAll().then((syncRows) => {
                    userStore.setUsers(syncRows);

                    if (
                      !userStore
                        .getUsers()
                        .map((a) => a.id)
                        .includes(userStore.getCurrentUser().id)
                    ) {
                      alert("Sing out...");
                      userStore.setCurrentUser({});
                      userStore.setIsAuth(false);
                      localStorage.removeItem("token");
                    }
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Block selected users">
              <IconButton
                onClick={() => {
                  blockById(selected);
                  alert("Data synchronization...");

                  getAll().then((syncRows) => {
                    userStore.setUsers(syncRows);

                    if (
                      userStore.users.find(
                        (element) =>
                          element.id === userStore.getCurrentUser().id &&
                          element.status === "Blocked"
                      )
                    ) {
                      alert("Sing out...");
                      userStore.setCurrentUser({});
                      userStore.setIsAuth(false);
                      localStorage.removeItem("token");
                    }
                  });
                }}
              >
                <BlockIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Activate selected users">
              <IconButton
                onClick={() => {
                  activateById(selected);
                  alert("Data synchronization...");

                  getAll().then((syncRows) => {
                    userStore.setUsers(syncRows);
                  });
                }}
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <UserTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <UserTableRow
                  key={row.id}
                  row={row}
                  index={index}
                  isSelected={isSelected}
                  handleClick={handleClick}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
});

export default UserTable;
