import { useContext } from "react";
import { observer } from "mobx-react-lite";
import MaterialTable from "material-table";
import Context from "../contexts/user-context";

import tableIcons from "./table-icons";
import { deleteById, getAll, blockById, activateById } from "../http/user-api";

const UserTable = observer(() => {
  const { user } = useContext(Context);
  const data = user.users;

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
              user.setUsers(syncRows);

              if (!user.users.map((a) => a.id).includes(user.user.id)) {
                alert("Sing out...");
                user.setUser({});
                user.setIsAuth(false);
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
              user.setUsers(syncRows);

              if (
                user.users.find(
                  (element) =>
                    element.id === user.user.id && element.status === "Blocked",
                )
              ) {
                alert("Sing out...");
                user.setUser({});
                user.setIsAuth(false);
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
              user.setUsers(syncRows);
            });
          },
        },
      ]}
    />
  );
});

export default UserTable;
