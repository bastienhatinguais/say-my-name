import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Typography,
  Grid
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import EmailIcon from "@material-ui/icons/Email";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";


class InscriptionForm extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      name: "",
      first_name: "",
      showPassword: false,
      play: false
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.inscription(
      this.state.name,
      this.state.first_name,
      this.state.email,
      this.state.password,
      this.state.username
    )
  };

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  inscription(name, firstName, email, password, username) {
    let newUser = {
      name: name,
      first_name: firstName,
      email: email,
      password: password,
      username: username
    };
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/add_utilisateur.php";
    let fetchOptions = {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: myHeader
    };
    // executer la req AJAX
    fetch(url, fetchOptions)
      .then(function (response) {
        //console.log(response.text());
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        return dataJSON;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Box
        display="flex"
        justifyContent="space-around"
        flexDirection="column"
        boxShadow={2}
        borderRadius={16}
        padding={3}
        style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20", backgroundColor: "white" }}
      >
        <Typography align="center" variant="h3" style={{ color: "#FFA600" }}>INSCRIPTION</Typography>
        <form onSubmit={this.handleSubmit}>
          <FormControl fullWidth>
            <label>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                fullWidth
                onChange={this.handleChange("email")}
                type="email"
                endAdornment={
                  <InputAdornment position="end">
                    <EmailIcon style={{ marginRight: "13px", color: "grey" }} />
                  </InputAdornment>
                }
              />
            </label>
          </FormControl>
          <Box display="flex">
            <FormControl>
              <label>
                <InputLabel htmlFor="first_name">Prénom</InputLabel>
                <Input
                  id="first_name"
                  type="text"
                  onChange={this.handleChange("first_name")}
                />
              </label>
            </FormControl>
            <FormControl style={{ marginLeft: "auto" }}>
              <InputLabel htmlFor="name">Nom</InputLabel>
              <Input
                id="name"
                type="text"
                fullWidth
                onChange={this.handleChange("name")}
              />
            </FormControl>
          </Box>
          <FormControl fullWidth>
            <label>
              <InputLabel htmlFor="username">Pseudo</InputLabel>
              <Input
                id="username"
                fullWidth
                type="text"
                onChange={this.handleChange("username")}
              />
            </label>
          </FormControl>
          <FormControl fullWidth>
            <label>
              <InputLabel htmlFor="password">Mot de passe</InputLabel>
              <Input
                id="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                          <VisibilityOff />
                        )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </label>
          </FormControl>

          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            style={{width:"100%", marginTop: "10px"}}>
            <Button
              variant="contained"
              style={{backgroundColor: "#FFA600", color:"white"}}
              onClick={(e) => {
                this.handleSubmit(e);
              }}
            >
              S'inscrire
          </Button>
            <Link to="/connexion" style={{ textDecoration: "none", color: "#FFA600"}}>
              <Button color="secondary" size="small" style={{ marginTop: "20px", color: "#FFA600" }}>
                Se connecter
          </Button>
            </Link>
          </Grid>
        </form>
      </Box>
    );
  }
}
export default InscriptionForm;
