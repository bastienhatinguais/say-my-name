import { Grid } from "@material-ui/core";
import Menu from "../components/menu";

export default function Accueil() {
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
