import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import Menu from "../components/menu";
import { gameManager } from "../gm";

export default function Accueil() {

  useEffect(
    function () {
      gameManager.quitter();
    },
    []
  )
  
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "60vh" }}
    >
      <Menu></Menu>
    </Grid>
  );
}
