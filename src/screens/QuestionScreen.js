import React, { useState, useEffect } from "react";
import { Button, Grid, Chip } from "@material-ui/core";
import { gameManager } from "../gm";
import FiniScreen from "./FiniScreen";
import { Redirect } from "react-router-dom";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

export default function QuestionScreen(props) {
  const [citation, setCitation] = useState("Chargement de la citation");
  const [question, setQuestion] = useState("Chargement de la question");
  const [propositions, setPropositions] = useState([]);
  const [reponse, setReponse] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [repondu, setRepondu] = useState(false);

  useEffect(() => {
    console.log(gameManager);

    setCitation(gameManager.citationActuelle);
    setQuestion(gameManager.questionActuelle);
    setPropositions(gameManager.questionActuelle.propositions || []);
    setReponse(gameManager.questionActuelle.reponse);
  }, []);

  if (!gameManager) {
    console.log("ptdr");
    return <FiniScreen message="Aucune partie en cours."></FiniScreen>;
  } else if (redirect) {
    return <Redirect to="/fini" />;
  } else {
    return (
      <>
        <Chip
          color="secondary"
          icon={<MonetizationOnIcon />}
          label={gameManager.score}
          style={{ position: "fixed", right: 10, top: 80 }}
        />
        <Grid container direction="column" justify="center" alignItems="center" style={{color:"white"}}>
          <h2> Citation : {citation.citation}</h2>
          <p>{question.question}</p>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ gap: 15 }}
          >
            {
            propositions.map((proposition, index) => {
              let classButton = "proposition";
              if (repondu) {
                classButton = index === reponse-1 ? "juste" : "faux";
              }
              return (
                <Button
                  className={classButton}
                  size="large"
                  key={index}
                  onClick={() => {
                    console.log(index, reponse);
                    if (index == reponse-1) {
                      gameManager.score += gameManager.questionActuelle.score;
                    }

                    setRepondu(true);
                    setTimeout(function () {
                      gameManager.questionSuivante();
                      if (gameManager.enJeu) {
                        setRepondu(false);
                        setQuestion(gameManager.questionActuelle);
                        setQuestion(gameManager.questionActuelle);
                        setPropositions(
                          gameManager.questionActuelle.propositions
                        );
                        setReponse(gameManager.questionActuelle.reponse);
                      } else {
                        setRedirect(true);
                      }
                    }, 3000);
                  }}
                >
                  {proposition}
                </Button>
              );
            })}
          </Grid>
        </Grid>
      </>
    );
  }
}
