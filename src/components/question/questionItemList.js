import React from "react";
import {
    ListItem, ListItemText, IconButton, ListItemSecondaryAction, Typography, Modal
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";



export default class QuestionItemList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            difficulte: props.difficulte,
            question: props.question,
            id: props.id
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                difficulte: this.props.difficulte,
                question: this.props.question,
                id: this.props.id
            })
        }
    }

    deleteQuestion(id) {
        console.log(id);
        const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/delete_question.php?id=" + id;
        let fetchOptions = {
            method: "GET"
        };
        // executer la req AJAX
        fetch(url, fetchOptions)
            .then(function (response) {
                //console.log(response.text());
                return response.json();
            })
            .then((dataJSON) => {
                this.props.updateQuestions();
                console.log(dataJSON);
                return dataJSON;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <ListItem divider>
                <ListItemText primary={<Typography type="body2" style={{ maxWidth: "90%", fontSize:"1.2em" }}>{this.state.question}</Typography>} secondary={"Difficulté / Score : " + this.state.difficulte} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => { this.props.setModalValues(this.state.question, this.state.difficulte, this.state.id); this.props.handleOpen(); }} >
                        <EditIcon style={{color:"#FFA600"}}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() =>
                        this.deleteQuestion(this.state.id)
                    }>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>)
    }
}