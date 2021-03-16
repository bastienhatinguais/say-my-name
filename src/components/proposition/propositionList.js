import React from "react";
import {
    List, ListItem, ListItemText, Checkbox, ListItemIcon, ListItemSecondaryAction, IconButton, TextField, Button
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
export default class PropositionList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestion: this.props.idQuestion,
            proposition_1: "",
            proposition_2: "",
            proposition_3: "",
            proposition_4: "",
            reponse: 0,
            editable: -1,
            edited: "",
            open: false,
        }
    }

    componentDidMount() {
        this.getPropositions();
    }

    getPropositions() {
        const url =
            "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/liste_proposition.php?id=" + this.state.idQuestion;
        console.log(url)
        let fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                let propositions = dataJSON[0];
                this.setState({
                    proposition_1: propositions['proposition_1'],
                    proposition_2: propositions['proposition_2'],
                    proposition_3: propositions['proposition_3'],
                    proposition_4: propositions['proposition_4'],
                    reponse: propositions['reponse'] - 1
                });
                console.log(this.state.reponse)

            });
    }

    updateReponse(reponse) {
        let data = {
            id: this.props.idQuestion,
            reponse: reponse
        };
        console.log(data)
        let myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/update_reponse.php";
        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(data),
            headers: myHeader
        };
        // executer la req AJAX
        fetch(url, fetchOptions)
            .then(function (response) {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
                this.getPropositions();
                return dataJSON;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateProposition(reponse) {
        let data = {
            proposition_1: this.state.proposition_1,
            proposition_2: this.state.proposition_2,
            proposition_3: this.state.proposition_3,
            proposition_4: this.state.proposition_4,
            id: this.state.idQuestion
        };
        let myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/update_proposition.php";
        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(data),
            headers: myHeader
        };
        // executer la req AJAX
        fetch(url, fetchOptions)
            .then(function (response) {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
                this.getPropositions();
                return dataJSON;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleToggle = (value) => {
        this.setState({ reponse: value });
        console.log(this.state.reponse, value)
    }

    handleEdit = (value) => {
        this.setState({ editable: value });
    }

    render() {
        return (
            <div>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;
                        const proposition = "proposition_" + (value + 1).toString();
                        return (
                            <ListItem key={value} role={undefined} dense divider style={{paddingLeft: "80px"}}>
                                <ListItemIcon onClick={(e) => { this.updateReponse(value + 1); e.stopPropagation() }}>
                                    <Checkbox
                                        edge="start"
                                        checked={this.state.reponse == value}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                    {this.state.editable == value ?
                                        <div>
                                            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={this.state[proposition]} onChange={(e) => { this.setState({ [proposition]: e.target.value }) }} />
                                            <Button onClick={() => {
                                                this.updateProposition();
                                                this.setState({ editable: -1})
                                            }}>Valider</Button>
                                        </div>
                                        :
                                        <ListItemText primary={this.state[proposition]} />}
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" style={{color: "#f50057"}} onClick={() => {
                                        this.handleEdit(value);
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>)
                    })}
                </List>
            </div>)
    }
}