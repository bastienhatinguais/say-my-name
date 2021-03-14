import ConnexionForm from "../components/connexionForm";
import { Grid } from "@material-ui/core";

export default function ConnexionScreen() {
  
    return (
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "80vh" }}
    >     
    <ConnexionForm></ConnexionForm>
  </Grid>
  );
}
