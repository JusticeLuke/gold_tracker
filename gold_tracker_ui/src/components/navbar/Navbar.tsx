import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CommonButton from "../common/commonButton/CommonButton";
import { mainNavbarItems, userNavbarItems } from "./constants/navbarItems";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../actions/userActions/AuthProvider";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "../common/commonButton/ToggleButton";




const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const theme = useTheme();
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const styles = {
    navbar: {
      backgroundColor: theme.palette.primary.main,
    },
  };

  return (
    <AppBar position="static" sx={styles.navbar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton onClick={() => navigate("../")} sx={{ p: 0 }}>
            <Avatar src="ljlogo.png" />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {mainNavbarItems.map((item, index): any => (
                <MenuItem
                  key={item.label}
                  onClick={() => {
                    navigate(item.route);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LJ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {mainNavbarItems.map((item, index) => (
              <CommonButton
                key={item.label}
                color="inherit"
                onClick={() => {
                  navigate(item.route);
                  handleCloseNavMenu();
                }}
              >
                {item.label}
              </CommonButton>
            ))}
          </Box>
          <ToggleButton/>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={auth.username ? auth.username.toUpperCase() : ""} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userNavbarItems.map((item, index): any => (
                <MenuItem
                  key={item.label}
                  onClick={() => {
                    navigate(item.route);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => {
                  auth.signout(() => navigate("login"));
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
