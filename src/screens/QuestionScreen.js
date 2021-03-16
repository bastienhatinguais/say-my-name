import React, { useState, useEffect } from "react";
import { Button, Grid, Chip, Box } from "@material-ui/core";
import { gameManager } from "../gm";
import FiniScreen from "./FiniScreen";
import { Redirect } from "react-router-dom";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export default function QuestionScreen(props) {
  const [citation, setCitation] = useState("Chargement de la citation");
  const [question, setQuestion] = useState("Chargement de la question");
  const [propositions, setPropositions] = useState([]);
  const [reponse, setReponse] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [repondu, setRepondu] = useState(false);
  const [temps, setTemps] = useState(gameManager.timer.getTimeValues().seconds);



  useEffect(() => {
    setCitation(gameManager.citationActuelle);
    setQuestion(gameManager.questionActuelle);
    setPropositions(gameManager.questionActuelle.propositions || []);
    setReponse(gameManager.questionActuelle.reponse);

    gameManager.timer.addEventListener('secondsUpdated', handlerOneSecond);

    return () => {
      gameManager.timer.removeEventListener('secondsUpdated', handlerOneSecond);
    };

  }, []);

  const handlerOneSecond = (e) => {
    setTemps(gameManager.timer.getTimeValues().seconds)
    if (gameManager.timer.getTimeValues().seconds = 0) {
      gameManager.timer.stop();
      if (!repondu) {
        setRepondu(true);
        finDuTour();
      }
    }
  }

  const finDuTour = () => {
    setTimeout(function () {
      gameManager.questionSuivante();
      if (gameManager.enJeu) {
        setRepondu(false);
        gameManager.timer.reset();
        setCitation(gameManager.citationActuelle);
        setQuestion(gameManager.questionActuelle);
        setPropositions(
          gameManager.questionActuelle.propositions
        );
        setReponse(gameManager.questionActuelle.reponse);
      } else {
        setRedirect(true);
      }
    }, 3000);
  }

  if (!gameManager) {
    return <FiniScreen message="Aucune partie en cours."></FiniScreen>;
  } else if (redirect) {
    return <Redirect to="/fini" />;
  } else {
    return (
      <>
        <Chip
          icon={<AccessTimeIcon style={{ fontSize: "1.2em" }} />}
          label={temps}
          style={{ position: "fixed", right: 100, top: 80, fontSize: "1.5em", minHeight: "40px" }}
        />
        <Chip
          color="secondary"
          icon={<MonetizationOnIcon style={{ fontSize: "1.2em" }} />}
          label={gameManager.score}
          style={{ position: "fixed", right: 10, top: 80, fontSize: "1.5em", minHeight: "40px" }}
        />
        <Grid container direction="column" justify="center" alignItems="center" style={{ color: "white", marginTop: "10vh" }}>
          <h2 style={{ fontSize: "3em", textShadow: "1px 1px 2px black" }}>{citation.citation}</h2>
          <h3 style={{ fontSize: "2em" }}>{question.question}</h3>
          <Box
            display="flex"
            justifyContent="space-around"
            flexDirection="column"
            boxShadow={2}
            borderRadius={16}
            padding={3}
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20", backgroundColor: "white" }}

          >
            <img style={{ marginLeft: "auto", marginRight: "auto", maxHeight: "20vh" }} src="img/logo_say_my_name_3.png" alt="logo3" />
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ gap: 15, marginTop: "30px" }}
            >
              {
                propositions.map((proposition, index) => {
                  let classButton = "proposition";
                  if (repondu) {
                    classButton = index === reponse - 1 ? "juste" : "faux";
                  }
                  return (
                    <Button
                      className={classButton}
                      variant="contained"
                      size="large"
                      key={index}
                      onClick={() => {
                        if (index == reponse - 1) {
                          gameManager.score += gameManager.questionActuelle.score;
                        }

                        setRepondu(true);
                        finDuTour();
                      }}
                    >
                      {proposition}
                    </Button>
                  );
                })}
            </Grid></Box>
        </Grid>
      </>
    );
  }
}
