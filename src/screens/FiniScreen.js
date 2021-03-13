import React, { useEffect } from "react";
import { gameManager } from "../gm";
import { Grid } from "@material-ui/core";


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
>
<h2 style={{color: "white"}}>Félicitation ! Votre score final est de {gameManager.score}</h2>
</Grid>;
}
