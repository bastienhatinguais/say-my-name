import InscriptionForm from "../components/inscriptionForm";
import { Grid } from "@material-ui/core";

export default function InscriptionScreen() {

  
    return (
        <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "80vh" }}
    >        
        <InscriptionForm></InscriptionForm>
        </Grid>
  );
}
