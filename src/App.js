import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Menu from "./components/menu";
import QuestionScreen from "./screens/QuestionScreen";
import CommencerScreen from "./screens/CommencerScreen";
import { gameManager } from "./gm";
import FiniScreen from "./screens/FiniScreen";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
  IconButton
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import Accueil from "./screens/Accueil";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },

  body: {
    margin: 0
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static" style={{background: "white", color: "#FFA600"}}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "#FFA600" }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Say My Name !
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <AccountCircleIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

    
      <img style={{position: 'absolute', right:0, width: "auto", height:"90vh", zIndex: "-1"}}src="img/question.jpg" alt="Question" />
      <Switch>
        <Route path="/fini">
          <FiniScreen></FiniScreen>
        </Route>
        <Route path="/enjeu">
          <QuestionScreen></QuestionScreen>
        </Route>
        <Route path="/jouer">
          <CommencerScreen></CommencerScreen>
        </Route>
        <Route path="/index">
          <Accueil></Accueil>
        </Route>
        <Route path="/">
          <Accueil></Accueil>
        </Route>
      </Switch>
    </Router>
  );
}
