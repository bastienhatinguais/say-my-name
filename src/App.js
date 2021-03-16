import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import QuestionScreen from "./screens/QuestionScreen";
import CommencerScreen from "./screens/CommencerScreen";
import FiniScreen from "./screens/FiniScreen";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import Accueil from "./screens/Accueil";
import ConnexionScreen from "./screens/ConnexionScreen";
import { AuthContext } from "./context/auth";
import { withStyles } from '@material-ui/styles';
import InscriptionScreen from "./screens/InscriptionScreen";
import AdministrateurQuestionScreen from "./screens/AdministrateurQuestionScreen";
import AdministrateurCitationScreen from "./screens/AministrateurCitationScreen";
import AdministrateurScreen from "./screens/AdministrateurScreen";
import PrivateRoute from "./components/privateRoute";



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
      authToken: null,
      admin: false,
      anchor: null,
    };
  }

  setAuthToken = (data) => {
    //localStorage.setItem("token", JSON.stringify(data._id));
    this.setState({
      authToken: data
    });
  };

  setAdmin = (data) => {
    this.setState({
      admin: data
    });
  };

  deleteAuthToken = () => {
    this.setState({
      authToken: null
    });
  };

  handleClickMenu = (event) => {
    this.setState({ anchor: event.currentTarget })
  };

  handleCloseMenu = () => {
    this.setState({ anchor: null })
  };

  render() {
    const { classes } = this.props;
    return (
      <AuthContext.Provider
        value={{
          authToken: this.state.authToken,
          admin: this.state.admin,
          setAuthToken: this.setAuthToken,
          setAdmin: this.setAdmin
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
              <Link to="/" style={{ textDecoration: "none" }}>

                <img style={{ objectFit: "content", maxHeight: "50px", width: "auto" }} src="img/logo_say_my_name_2.png" alt="logo" />
              </Link>
              <div style={{ marginLeft: "auto" }}
              ></div>
              {this.state.authToken ?
                <>
                  <IconButton
                    edge="end"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={this.handleClickMenu}
                    style={{ marginLeft: "auto" }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchor}
                    keepMounted
                    open={Boolean(this.state.anchor)}
                    onClose={this.handleCloseMenu}
                    style={{ paddingTop: "30px" }}
                  >
                    <MenuItem onClick={this.handleCloseMenu}>Mon compte</MenuItem>
                    <MenuItem onClick={() => {
                      this.handleCloseMenu();
                      console.log(this.state.authToken)
                      this.deleteAuthToken();
                      this.setAdmin(false);
                    }}>Déconnexion</MenuItem>
                  </Menu> </> : <></>
              }
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
            <PrivateRoute path="/administrateur_question" component={AdministrateurQuestionScreen}>
            </PrivateRoute>
            <PrivateRoute path="/administrateur_citation" component={AdministrateurCitationScreen}>
            </PrivateRoute>
            <PrivateRoute path="/administrateur" component={AdministrateurScreen}>
            </PrivateRoute>
            <PrivateRoute path="/fini" component={FiniScreen}>
            </PrivateRoute>
            <PrivateRoute path="/enjeu" component={QuestionScreen}>
            </PrivateRoute>
            <PrivateRoute path="/jouer" component={CommencerScreen}>
            </PrivateRoute>
            <Route path="/inscription" component={InscriptionScreen}>
            </Route>
            <Route path="/connexion" component={ConnexionScreen}>
            </Route>
            <PrivateRoute path="/index" component={Accueil}>
            </PrivateRoute>
            <PrivateRoute path="/" component={Accueil}>
            </PrivateRoute>

          </Switch>
        </Router>
      </AuthContext.Provider>

    );
  }
}

export default withStyles(styles)(App);
