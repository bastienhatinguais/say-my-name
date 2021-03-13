import React from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <Grid container spacing={0} align="center" justify="center">
      <Grid item>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="large vertical contained primary button group"
          variant="text"
          size="large"
        >
          <Button>
            <Link to="/jouer" style={{ textDecoration: "none" }}>
              JOUER !
            </Link>
          </Button>

          <Button>PARAMETRES</Button>
          <Button>CREDITS</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
