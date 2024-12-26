import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import Context from "../contexts/user-context";

import tableIcons from "./table-icons";
import { deleteById, getAll, blockById, activateById } from "../http/user-api";

const UserTable = observer(() => {
  const defaultMaterialTheme = createTheme();

  const { userStore } = useContext(Context);
  const data = userStore.getUsers();

  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Last logined at",
      field: "lastLoginedAt",
    },
    {
      title: "Created at",
      field: "createdAt",
    },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title={null}
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{
            selection: true,
          }}
          actions={[
            {
              tooltip: "Remove all selected users",
              icon: tableIcons.Delete,
              onClick: (evt, rows) => {
                const ids = rows.map((a) => a.id);

                deleteById(ids);
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
              },
            },
            {
              tooltip: "Block all selected users",
              icon: tableIcons.BlockIcon,
              onClick: (evt, rows) => {
                const ids = rows.map((a) => a.id);

                blockById(ids);
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
              },
            },
            {
              tooltip: "Activate all selected users",
              icon: tableIcons.CheckCircleIcon,
              onClick: (evt, rows) => {
                const ids = rows.map((a) => a.id);

                activateById(ids);
                alert("Data synchronization...");

                getAll().then((syncRows) => {
                  userStore.setUsers(syncRows);
                });
              },
            },
          ]}
        />
      </ThemeProvider>
    </div>
  );
});

export default UserTable;
