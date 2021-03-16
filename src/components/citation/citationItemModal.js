import React from "react";
import {
    Modal, TextField, Button, Grid, FormControlLabel, FormControl, Dialog
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';




const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});

class CitationItemModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            citation: props.citation,
            nom: props.nom,
            id: props.id
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                citation: this.props.citation,
                nom: this.props.nom,
                id: this.props.id
            })
        }
    }
    
    updateCitation() {
        console.table(JSON.stringify({ nom: this.state.nom, citation: this.state.citation, id: parseInt(this.state.id, 10) }));
        let myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/update_citation.php";
        let fetchOptions = {
            method: "POST",
            body: JSON.stringify({ nom: this.state.nom, citation: this.state.citation, id: parseInt(this.state.id, 10) }),
            headers: myHeader
        };
        // executer la req AJAX
        fetch(url, fetchOptions)
            .then(function (response) {
                //console.log(response.text());
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
                this.props.updateCitations();
                return dataJSON;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange = (prop) => (event) => {
        this.setState({ [prop]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="list-item"
                aria-describedby="list-item"
                className={classes.modal}
            >

                <div className={classes.paper}>
                    <FormControl fullWidth spacing={3}>
                        <TextField id="outlined-basic" label="Citation" variant="outlined" value={this.state.citation}
                            onChange={this.handleChange("citation")} style={{ marginBottom: '15px' }} />
                        <TextField id="outlined-basic" label="Nom" variant="outlined" value={this.state.nom}
                            onChange={this.handleChange("nom")} style={{ marginBottom: '15px' }} />
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#FFA600", color: "white" }}
                            onClick={(e) => {
                                console.log('update citation button modal')
                                this.updateCitation(); this.props.handleClose();
                            }}
                        >
                            Valider
                    </Button>
                    </FormControl>
                </div>
            </Dialog>)
    }
}

export default withStyles(styles)(CitationItemModal)