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
    Grid,
    CircularProgress
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import EmailIcon from "@material-ui/icons/Email";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

class ConnexionForm extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPassword: false,
            inProgress: false,
            redirect: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.email !== "" && this.state.password !== "") {
            this.connexion(this.state.email, this.state.password).then((data) => {
                this.context.setAuthToken(data.id);
                this.context.setAdmin(data.admin);
                this.setState({redirect: true});
            });
        }
        this.setState({inProgress: true})
    };

    handleChange = (prop) => (event) => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    connexion(email, password) {
        const url = `http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/connect_utilisateur.php?email=${email}&motdepasse=${password}`
        let fetchOptions = { method: "GET" };
        let id = fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
                return dataJSON;
            })
            .catch((error) => {
                console.log(error);
            });
        return id;
    }

    render() {
        if(this.state.redirect){
            return <Redirect to="/" />

        }
        if (this.state.inProgress) {
            return <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ height: "60vh" }}
            ><CircularProgress style={{ color: "white" }} /></Grid>
        }
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
                <Typography align="center" variant="h3" style={{ color: "#FFA600" }}>CONNEXION</Typography>
                <form onSubmit={this.handleSubmit}>
                    <FormControl fullWidth>
                        <label>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                id="email"
                                fullWidth
                                type="email"
                                onChange={this.handleChange("email")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <EmailIcon style={{ marginRight: "13px", color: "grey" }} />
                                    </InputAdornment>
                                }
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
                        style={{ width: "100%", marginTop: "10px" }}>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#FFA600", color: "white" }}
                            onClick={(e) => {
                                this.handleSubmit(e);
                            }}
                        >
                            Se connecter
          </Button>
                        <Link to="/inscription" style={{ textDecoration: "none", color: "#FFA600" }}>
                            <Button color="secondary" size="small" style={{ marginTop: "20px", color: "#FFA600" }}>
                                S'inscrire
          </Button>
                        </Link>
                    </Grid>
                </form>
            </Box>
        );
    }
}

export default ConnexionForm;
