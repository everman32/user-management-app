import { observer } from "mobx-react-lite";
import { Alert, AlertTitle } from "@mui/material";

const customAlert = observer(() => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      This is an error alert — <strong>check it out!</strong>
    </Alert>
  );
});

export default customAlert;
