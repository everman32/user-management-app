import Management from "./pages/management";
import SingIn from "./pages/sing-in";
import SingUp from "./pages/sing-up";
import { MANAGEMENT_ROUTE, SINGIN_ROUTE, SINGUP_ROUTE } from "./utils/consts";

export const authRoutes = [
  {
    path: MANAGEMENT_ROUTE,
    Component: Management,
  },
];

export const publicRoutes = [
  {
    path: SINGIN_ROUTE,
    Component: SingIn,
  },
  {
    path: SINGUP_ROUTE,
    Component: SingUp,
  },
];
