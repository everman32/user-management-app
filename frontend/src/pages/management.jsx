import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import UserTable from "../components/user-table";
import Context from "../contexts/user-context";
import { getAll } from "../http/user-api";

const Management = observer(() => {
  const { user } = useContext(Context);

  useEffect(() => {
    getAll().then((data) => {
      user.setUsers(data);
    });
  }, [user]);
  return <UserTable />;
});

export default Management;
