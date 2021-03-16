import React from "react";
import {
    ListItem, Grid, TextField, Button
} from "@material-ui/core";


export default class QuestionItemAjout extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            question: "",
            difficulte: "",
        }
    }

    addQuestion() {
        let question= {
            question: this.state.question,
            difficulte: this.state.difficulte
          };
          let myHeader = new Headers();
          myHeader.append("Content-Type", "application/json");
          const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/add_enonce.php";
          let fetchOptions = {
            method: "POST",
            body: JSON.stringify(question),
            headers: myHeader
          };
          // executer la req AJAX
          fetch(url, fetchOptions)
            .then(function (response) {
              return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
              this.props.updateQuestions();
              return dataJSON;
            })
            .catch((error) => {
              console.log(error);
            });
    }

    handleChangeValues = (prop) => (event) => {
        this.setState({ [prop]: event.target.value });
    };

    render() {
        return (
            <ListItem style={{marginTop: "30px"}}>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                >

                    <TextField id="question_add" label="Question" variant="outlined" value={this.state.question}
                        onChange={this.handleChangeValues("question")} style={{ marginBottom: '15px' }} />
                    <TextField id="difficulte_add" label="Difficulté / Score" variant="outlined" value={this.state.difficulte}
                        onChange={this.handleChangeValues("difficulte")} style={{ marginBottom: '15px' }} />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#FFA600", color: "white", marginTop:"-15px" }}
                        onClick={(e) => {
                            this.addQuestion();
                            this.setState({
                                question: "",
                                difficulte: ""
                            })
                        }}
                    >
                        Ajouter
                </Button>
                </Grid>

            </ListItem>)
    }
}