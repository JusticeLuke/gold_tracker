import PeopleIcon from "@mui/icons-material/People";
import ImageIcon from "@mui/icons-material/Image";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";

export const mainNavbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: "Gold Tracker",
    route: "partys",
  },
  {
    id: 1,
    icon: <SettingsInputComponentIcon />,
    label: "Monster Generator",
    route: "monsterGen",
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
