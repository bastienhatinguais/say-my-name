import React from 'react';
import { useContext } from "react";
import QuestionList from "../components/question/questionList"
import { Grid, Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {AuthContext} from "../context/auth";
import { Redirect } from "react-router";


export default function AdministrateurQuestionScreen() {
  const authContext = useContext(AuthContext);

  if (authContext.admin) {
    return (<>
      <Fab color="white" aria-label="add" style={{ marginTop: "20px", marginLeft: "20px" }}>
        <Link to="/administrateur" style={{ textDecoration: "none", color: "black", marginTop: "8px" }}>
          <ArrowBackIcon />
        </Link>
      </Fab>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <QuestionList></QuestionList>
      </Grid></>)
  } else {
    return <Redirect to="/" />
  };
}