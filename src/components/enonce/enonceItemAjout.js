import React from "react";
import {
    ListItem, FormControl, InputLabel, Select, MenuItem, Button
} from "@material-ui/core";


export default class EnonceItemAjout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            idQuestionSelect: ""
        }
    }

    componentDidMount() {
        this.getQuestions(this.props.idMedia);
    }

    addQuestion() {
        let question = {
            id_question: this.state.idQuestionSelect,
            id_media: this.props.idMedia
        };
        let myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/add_question.php";
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

    getQuestions(idMedia) {
        const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/get_question_from_id.php?id_media=" + idMedia;
        let fetchOptions = {
            method: "GET",
        };
        // executer la req AJAX
        fetch(url, fetchOptions)
            .then(function (response) {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
                this.setState({ questions: dataJSON })
                return dataJSON;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange = (event) => {
        this.setState({ idQuestionSelect: event.target.value });
    };

    render() {
        return (
            <ListItem>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Question à ajouter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={this.handleChange}
                        value={this.state.idQuestionSelect}
                        
                    >
                        {this.state.questions.map((question) => {
                            return <MenuItem value={question.id}>{question.question}</MenuItem>
                        })}
                    </Select>
                    <Button variant="contained" style={{marginTop:"20px", backgroundColor: "#FFA600", color:"white"}} onClick={
                        () => { this.addQuestion() }
                    }>Valider</Button>
                </FormControl>
            </ListItem>)
    }
}