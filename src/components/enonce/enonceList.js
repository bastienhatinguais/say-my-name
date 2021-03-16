import React from "react";
import {
    List
} from "@material-ui/core";

import EnonceItemList from './enonceItemList';
import EnonceItemAjout from "./enonceItemAjout"


export default class EnonceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
        }
    }

    componentDidMount() {
        this.getQuestions(this.props.idMedia);
    }

    getQuestions(idMedia) {
        const url =
            "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/liste_enonce.php?id_media=" + idMedia;
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
                    a['id'] = q.id;
                    questions.push(a);
                }
                this.setState({ questions: questions });
                console.table(questions);
            });
    }

    render() {
        return (
            <div>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    {this.state.questions.map((question, index) => {
                        return <EnonceItemList key={index} id={question.id} question={question.question} updateQuestions={() => {this.getQuestions(this.props.idMedia);}}></EnonceItemList>
                    })}
                    <EnonceItemAjout updateQuestions={() => {this.getQuestions(this.props.idMedia);}} idMedia={this.props.idMedia}></EnonceItemAjout>
                </List>
            </div>)
    }
}