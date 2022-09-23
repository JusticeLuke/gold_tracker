import PeopleIcon from "@mui/icons-material/People";
import ImageIcon from "@mui/icons-material/Image";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";

export const mainNavbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: "Gold Tracker",
    route: "partys",
  },
];

export const userNavbarItems = [
  {
    id: 2,
    icon: <ImageIcon />,
    label: "Account",
    route: "login",
  },
  {
    id: 2,
    icon: <ImageIcon />,
    label: "Login",
    route: "login",
  },
  {
    id: 3,
    icon: <SettingsEthernetIcon />,
    label: "Register",
    route: "register",
  },
];
