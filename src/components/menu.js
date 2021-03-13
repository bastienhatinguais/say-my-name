import React from "react";
import { Button, IconButton } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';


export default function Menu() {
  return (
    <Grid
      className="jouer"
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid item >
        <IconButton>
          <Link to="/jouer" style={{ textDecoration: "none", color: "#FFA600" }}>
          <PlayCircleOutlineIcon fontSize="large" style={{ fill: "white", width: 300, height: 300 }}>
            </PlayCircleOutlineIcon>
          </Link>
        </IconButton>

      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          style={{ color: "#FFA600" }}
          size="large"
        >
          Paramètres
      </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Delete
      </Button>
      </Grid>
    </Grid>
  );
}
