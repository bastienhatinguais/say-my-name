import React from "react";
import {
    ListItem, Grid, TextField, Button, Box
} from "@material-ui/core";


export default class CitationItemAjout extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            citation: "",
            nom: "",
        }
    }

    addCitation() {
        let citation = {
            nom: this.state.nom,
            citation: this.state.citation
          };
          let myHeader = new Headers();
          myHeader.append("Content-Type", "application/json");
          const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/add_citation.php";
          let fetchOptions = {
            method: "POST",
            body: JSON.stringify(citation),
            headers: myHeader
          };
          // executer la req AJAX
          fetch(url, fetchOptions)
            .then(function (response) {
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

    handleChangeValues = (prop) => (event) => {
        this.setState({ [prop]: event.target.value });
    };

    render() {
        return (

            <ListItem style={{paddingTop: "30px"}}>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                >

                    <TextField id="citation_add" label="Citation" variant="outlined" value={this.state.citation}
                        onChange={this.handleChangeValues("citation")} style={{ marginBottom: '15px' }} />
                    <TextField id="nom_add" label="Nom" variant="outlined" value={this.state.nom}
                        onChange={this.handleChangeValues("nom")} style={{ marginBottom: '15px' }} />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#FFA600", color: "white", marginTop:"-20px" }}
                        onClick={(e) => {
                            this.addCitation();
                            this.setState({
                                citation: "",
                                nom: ""
                            })
                        }}
                    >
                        Ajouter
                </Button>
                </Grid>

            </ListItem>
            )
    }
}