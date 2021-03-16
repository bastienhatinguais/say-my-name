import { Button, Grid, Icon } from "@material-ui/core";
import React, { useState } from "react";
import { gameManager } from "../gm";
import { Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoIcon from '@material-ui/icons/Info';

export default function CommencerScreen() {
  const [redirect, setRedirect] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  if (redirect)
    return <Redirect to="/enjeu" />
  if (inProgress)
    return <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "60vh" }}
    ><CircularProgress style={{color:"white"}} /></Grid>
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "60vh" }}
    >
      <Button
        size="large"
        style={{ color: "white", fontSize: "50px" }}
        onClick={() => {
          gameManager.commencer().then((res) => {
            setRedirect(true);
          });
          setInProgress(true);
        }}
      >
        Commencer
      </Button>
      <p style={{color:"white", fontSize:"1.2em"}}><InfoIcon/> Après avoir appuyé sur le bouton "commencer", la partie débutera et vous disposerez de 15 secondes par question. Bonne chance !</p>
    </Grid>
  );
}
