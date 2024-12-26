import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Context from "./contexts/user-context";
import UserStore from "./storage/user-storage";

ReactDOM.render(
  <Context.Provider
    value={{
      userStore: new UserStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
