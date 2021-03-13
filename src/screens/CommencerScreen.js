import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { gameManager } from "../gm";
import { Redirect } from "react-router-dom";

export default function CommencerScreen() {
  const [redirect, setRedirect] = useState(false);

  return redirect ? (
    <Redirect to="/enjeu" />
  ) : (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "60vh" }}
    >
      <Button
        onClick={() => {
          gameManager.commencer().then((res) => {
            console.log(
              "avant de redirect " + gameManager.citationActuelle.citation
            );
            setRedirect(true);
          });
        }}
      >
        Commencer
      </Button>
    </Grid>
  );
}
