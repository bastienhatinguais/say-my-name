import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useContext } from "react";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, Typography, Fab } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    color: "white",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  icon: {
    color: "black"
  },

  listItem: {
    border: "solid 1px white",
    boxShadow: "4px -4px 4px rgba(0,0,0,.7)",
    backgroundColor: "white",
    color: "black"
  }
}));

export default function AdministrateurScreen() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const authContext = useContext(AuthContext);

  if (authContext.admin) {
    return (
      <>
        <Fab color="white" aria-label="add" style={{ marginTop: "20px", marginLeft: "20px" }}>
          <Link to="/" style={{textDecoration: "none", color: "black", marginTop:"8px"}}>
            <ArrowBackIcon />
          </Link>
        </Fab>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          style={{ height: "80vh" }}
        >             <Box
          display="flex"
          justifyContent="space-around"
          flexDirection="column"
          boxShadow={2}
          borderRadius={16}
          padding={3}
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20", backgroundColor: "white", height: "50%" }}

        >     <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          style={{ height: "80%" }}
        >
              <Typography align="center" variant="h3" style={{ color: "#FFA600" }}>ADMINISTRATEUR</Typography>
              <Link to="/administrateur_question" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#FFA600", color: "white" }}
                  size="large"
                >
                  Administrer les questions
        </Button>
              </Link>
              <Link to="/administrateur_citation" style={{ textDecoration: "none", color: "#FFA600" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#FFA600", color: "white" }}
                  size="large"
                >
                  Administrer les citations
        </Button>
              </Link>
            </Grid></Box>
        </Grid>
      </>);
  } else {
    return <Redirect to="/" />
  }

}