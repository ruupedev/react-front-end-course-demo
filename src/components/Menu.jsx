import { useState } from "react";

import Box from "@mui/material/Box";

import CreateIcon from "@mui/icons-material/Create";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import BarChartIcon from "@mui/icons-material/BarChart";

import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import HomeIcon from "@mui/icons-material/Home";
import { Link, Outlet } from "react-router";

function MenuMUI() {
  const [anchorMenu, setMenuOpen] = useState(null);

  const menuOpen = (e) => {
    setMenuOpen(e.currentTarget);
  };

  const menuClose = () => {
    setMenuOpen(null);
  };

  const menu = (
    <Menu
      anchorEl={anchorMenu}
      open={Boolean(anchorMenu)}
      onClose={() => menuClose()}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <MenuItem onClick={menuClose} component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Etusivu" />
      </MenuItem>

      <MenuItem onClick={() => menuClose()} component={Link} to="/hae">
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Hae tavarat" />
      </MenuItem>

      <MenuItem onClick={() => menuClose()} component={Link} to="/lisaa">
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText primary="Lisää tavara" />
      </MenuItem>

      <MenuItem onClick={() => menuClose()} component={Link} to="/analytiikka">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Analytiikka" />
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={(e) => menuOpen(e)} color="inherit">
            <MenuIcon />{" "}
          </IconButton>

          {menu}

          <Typography
            variant="h5"
            component="h5"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Pihakirpputori
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
export default MenuMUI;
