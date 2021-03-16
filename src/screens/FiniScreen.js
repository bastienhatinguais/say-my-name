import React, { useEffect } from "react";
import { gameManager } from "../gm";
import { Grid, Button, Box } from "@material-ui/core";
import ReplayIcon from '@material-ui/icons/Replay';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";



export default function FiniScreen() {
  useEffect(() => {
    return () => {
      gameManager.quitter();
    };
  }, []);

  return <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    spacing={0}
    style={{ height: "80vh" }}
  >
    <Box
      display="flex"
      justifyContent="space-around"
      flexDirection="column"
      boxShadow={2}
      borderRadius={16}
      padding={3}
      style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20", backgroundColor: "white" }}

    >
      <h2 style={{ color: "#383838" }}>Félicitation ! Votre score final est de {gameManager.score}.</h2>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Link to="/jouer" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ReplayIcon />}
            style={{ minWidth: "200px", marginBottom: "10px", marginRight:"20px" }}
          >
            Rejouer
      </Button>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<InfoIcon />}
            style={{ minWidth: "200px", color: "white", marginBottom: "10px", backgroundColor: "#383838" }}
          >
            Menu
      </Button>
        </Link>
      </Grid>

    </Box>
  </Grid>;
}
