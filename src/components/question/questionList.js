import React from "react";
import {
    List, ListSubheader, Box
} from "@material-ui/core";

import QuestionItemList from './questionItemList';
import QuestionItemAjout from "./questionItemAjout";
import QuestionItemModal from "./questionItemModal";


export default class QuestionList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            modalEnonce: "",
            modalDifficulte: "",
            modalId: 0,
            open: false
        }
    }

    componentDidMount() {
        this.getQuestions();
    }

    getQuestions() {
        console.log("update questions");
        const url =
            "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/liste_question.php";
        let fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                let questions = [];
                for (const q of dataJSON) {
                    let a = [];
                    a['question'] = q.question;
                    a['difficulte'] = q.difficulte;
                    a['id'] = q.id;
                    questions.push(q);
                }
                console.table(questions);
                this.setState({ questions: questions});
            });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    setModalValues = (question, difficulte, id) => {
        this.setState({ modalDifficulte: difficulte, modalQuestion: question, modalId: id });
    }

    render() {
        return (
            <Box
            display="flex"
            justifyContent="space-around"
            flexDirection="column"
            boxShadow={2}
            borderRadius={16}
            padding={3}
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20", backgroundColor: "white" }}

        >
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    style={{minWidth:"90%"}}
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" style={{ color: "grey", textAlign:"center" }}>
                            Liste des Questions
                </ListSubheader>
                    }
                >
                    {this.state.questions.map((question) => {
                        return <QuestionItemList key={question.id} question={question.question} difficulte={question.difficulte} id={question.id} handleOpen={this.handleOpen} handleClose={this.handleClose} setModalValues={this.setModalValues} updateQuestions={() => { this.getQuestions(); console.log("hello") }}></QuestionItemList>
                    })}
                    <QuestionItemAjout updateQuestions={() => { this.getQuestions(); console.log("le bon") }}></QuestionItemAjout>
                </List>
                <QuestionItemModal question={this.state.modalQuestion} difficulte={this.state.modalDifficulte} id={this.state.modalId} handleClose={this.handleClose} open={this.state.open} updateQuestions={() => { this.getQuestions(); }}></QuestionItemModal>
            </Box>)
    }
}