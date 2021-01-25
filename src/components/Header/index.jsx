import React from "react";
import {
  AppBar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TranslateIcon from "@material-ui/icons/Translate";
import HomeIcon from "@material-ui/icons/Home";
import { useStyles } from "./styles";
import { useFormContext } from "../../providers/form";
import { useTranslation } from "react-i18next";
import changeLanguage from "../../utils/changeLanguage";
import { Link } from "react-router-dom";
export function Header() {
  const styles = useStyles();
  const { setFormValues } = useFormContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (language) => {
    setAnchorEl(null);
    changeLanguage(language);
  };

  const filteredPost = (searchField) => {
    if (searchField) {
      setFormValues({
        type: "search",
        payload: {
          searchField,
        },
      });
    }
  };

  return (
    <AppBar position="static" data-testid="header">
      <Toolbar className={styles.mainContainer}>
        <Link noWrap className={styles.link} to="/app">
          <HomeIcon />

          <Typography
            className={styles.title}
            variant="h6"
            data-testid="header-title"
          >
            {t("headerTitle")}
          </Typography>
        </Link>

        <div className={styles.containerSearch}>
          <div className={styles.search}>
            <div className={styles.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={t("searchPlaceholder")}
              classes={{
                root: styles.inputRoot,
                input: styles.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(data) => {
                filteredPost(data.target.value);
              }}
              data-testid="search"
            />
          </div>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <TranslateIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              data-testid="lang-menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem data-testid="en" onClick={() => handleClose("en")}>
                Inglês
              </MenuItem>
              <MenuItem data-testid="pt" onClick={() => handleClose("pt")}>
                Português
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
