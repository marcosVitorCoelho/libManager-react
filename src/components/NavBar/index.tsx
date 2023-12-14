import { useContext, useState } from "react";
import * as S from "./styles";
import Box from "@mui/material/Box";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import WindowIcon from "@mui/icons-material/Window";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import UserAuthenticationContext from "../../contexts/UserAuthContex";
import { checkUserAuth } from "../../utils/CheckUserAuth/CheckUserAuth";
import { Book, Person, VerifiedUserSharp } from "@mui/icons-material";

export default function MiniDrawer() {
  const { handleSessionUser } = useContext(UserAuthenticationContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box sx={{ display: "flex", position: "absolute", zIndex: 1000 }}>
      <S.Drawer variant="permanent" open={open}>
        <S.CustomList>
          <div>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleDrawerOpen}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary={"Menu"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <Link
              to={"/home"}
              style={{ textDecoration: "none", color: "#29292E" }}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  selected={location.pathname === "/home"}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Book />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Livros"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={"/customers"}
              style={{ textDecoration: "none", color: "#29292E" }}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  selected={location.pathname === "/customer"}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Clientes"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={"/loanPage"}
              style={{ textDecoration: "none", color: "#29292E" }}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  selected={location.pathname === "/customer"}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <WindowIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Locação"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </div>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleSessionUser}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LoginRoundedIcon color="warning" />
              </ListItemIcon>
              <ListItemText
                primary={checkUserAuth() ? "Logout" : "Login"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </S.CustomList>
      </S.Drawer>
    </Box>
  );
}
