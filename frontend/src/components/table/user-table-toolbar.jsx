import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Typography, IconButton, Tooltip, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  deleteById,
  blockById,
  activateById,
  getAll,
} from "../../http/user-api";

const UserTableToolbar = ({ numSelected, selected, userStore }) => {
  const handleDelete = async () => {
    await deleteById(selected);
    alert("Data synchronization...");

    const syncRows = await getAll();
    userStore.setUsers(syncRows);

    // If the current user is no longer in the list, log them out
    const currentUserId = userStore.getCurrentUser().id;
    if (!syncRows.some((user) => user.id === currentUserId)) {
      alert("Sign out...");
      userStore.setCurrentUser({});
      userStore.setIsAuth(false);
      localStorage.removeItem("token");
    }
  };

  const handleBlock = async () => {
    await blockById(selected);
    alert("Data synchronization...");

    const syncRows = await getAll();
    userStore.setUsers(syncRows);

    // If the current user is blocked, log them out
    const currentUser = syncRows.find(
      (user) => user.id === userStore.getCurrentUser().id
    );
    if (currentUser && currentUser.status === "Blocked") {
      alert("Sign out...");
      userStore.setCurrentUser({});
      userStore.setIsAuth(false);
      localStorage.removeItem("token");
    }
  };

  const handleActivate = async () => {
    await activateById(selected);
    alert("Data synchronization...");

    const syncRows = await getAll();
    userStore.setUsers(syncRows);
  };

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
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Block selected users">
            <IconButton onClick={handleBlock}>
              <BlockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Activate selected users">
            <IconButton onClick={handleActivate}>
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Toolbar>
  );
};

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  userStore: PropTypes.object.isRequired,
};

export default UserTableToolbar;
