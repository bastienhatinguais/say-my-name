import { React, useContext } from "react";
import { Button, IconButton } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { AuthContext } from "../context/auth"
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InfoIcon from '@material-ui/icons/Info';

export default function Menu() {
  const authContext = useContext(AuthContext);
  return (
    <Grid
      className="jouer"
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <IconButton>
        <Link to="/jouer" style={{ textDecoration: "none", color: "#FFA600" }}>
          <PlayCircleOutlineIcon fontSize="large" style={{ fill: "white", width: 300, height: 300 }}>
          </PlayCircleOutlineIcon>
        </Link>
      </IconButton>

      {authContext.admin ?
        <Link to="/administrateur" style={{ textDecoration: "none", color: "#FFA600" }}>
          <Button
            variant="contained"
            startIcon={<SupervisorAccountIcon />}
            size="large"
            style={{color: "#FFA600", backgroundColor:"white",minWidth: "200px", marginBottom:"10px"}}
          >
            Administrer
      </Button>
        </Link> : <></>}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<EqualizerIcon />}
        style={{minWidth: "200px", marginBottom:"10px"}}
      >
        Classement
      </Button>
      <Button
        variant="contained"
        startIcon={<InfoIcon />}
        style={{minWidth: "200px",color:"white", marginBottom:"10px", backgroundColor:"#383838"}}
      >
        Règles
      </Button>
    </Grid>
  );
}
