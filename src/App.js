import React from "react";
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
  IconButton
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import Accueil from "./screens/Accueil";
import ConnexionScreen from "./screens/ConnexionScreen";
import { AuthContext } from "./context/auth";
import { withStyles } from '@material-ui/styles';
import InscriptionScreen from "./screens/InscriptionScreen";



const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
  },
  title: {
    flexGrow: 1,
  },
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authToken: null
    };
  }

  setAuthToken = (data) => {
    //localStorage.setItem("token", JSON.stringify(data._id));
    this.setState({
      authToken: data
    });
  };

  deleteAuthToken = () => {
    this.setState({
      authToken: null
    });
  };


  render() {
    const { classes } = this.props;
    return (
      <AuthContext.Provider
        value={{
          authToken: this.state.authToken,
          setAuthToken: this.setAuthToken
        }}
      >

        <Router>
          <AppBar position="static" style={{ background: "white", color: "#FFA600" }}>
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


          <img style={{ position: 'absolute', right: 0, width: "auto", height: "90vh", zIndex: "-1" }} src="img/question.jpg" alt="Question" />
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
            <Route path="/inscription">
              <InscriptionScreen></InscriptionScreen>
            </Route>
            <Route path="/connexion">
              <ConnexionScreen></ConnexionScreen>
            </Route>
            <Route path="/index">
              <Accueil></Accueil>
            </Route>
            <Route path="/">
              <Accueil></Accueil>
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>

    );
  }
}

export default withStyles(styles)(App);
