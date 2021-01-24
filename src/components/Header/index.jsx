import React from "react";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { useStyles } from "./styles";
import { useFormContext } from "../../providers/form";

export function Header() {
  const styles = useStyles();
  const { formState, setFormValues } = useFormContext();

  const filteredPost = (searchField) => {
    console.log(searchField);
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
    <AppBar position="static">
      <Toolbar>
        <HomeIcon />

        <Typography className={styles.title} variant="h6" noWrap>
          Home
        </Typography>
        <div className={styles.search}>
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: styles.inputRoot,
              input: styles.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={(data) => {
              filteredPost(data.target.value);
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}
