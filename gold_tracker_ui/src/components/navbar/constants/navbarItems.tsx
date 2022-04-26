import PeopleIcon from "@mui/icons-material/People";
import ImageIcon from "@mui/icons-material/Image";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import DnsIcon from "@mui/icons-material/Dns";

export const mainNavbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: "Partys",
    route: "partys",
  },
  {
    id: 1,
    icon: <SettingsInputComponentIcon />,
    label: "Monster Generator",
    route: "monsterGen",
  },
  {
    id: 2,
    icon: <ImageIcon />,
    label: "Login",
    route: "login",
  },
  {
    id: 3,
    icon: <PublicIcon />,
    label: "Logout",
    route: "logout",
  },
  {
    id: 4,
    icon: <SettingsEthernetIcon />,
    label: "Register",
    route: "register",
  },
];
