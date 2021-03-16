import React from "react";
import {
    List, ListSubheader, Grid, CircularProgress, Box
} from "@material-ui/core";

import CitationItemList from './citationItemList';
import CitationItemAjout from "./citationItemAjout";
import CitationItemModal from "./citationItemModal";


export default class CitationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            citations: [],
            modalCitation: "",
            modalNom: "",
            modalId: 0,
            open: false,
            inProgress: false
        }
    }

    componentDidMount() {
        this.getCitations();
    }

    async getCitations() {
        this.setState({ inProgress: true })
        const url =
            "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/liste_citation.php";
        let fetchOptions = { method: "GET" };
        let result = await fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                let citations = [];
                for (const c of dataJSON) {
                    let a = [];
                    a['citation'] = c.citation;
                    a['nom'] = c.nom;
                    a['id'] = c.id;
                    citations.push(a);
                }
                console.table(citations)
                this.setState({ citations: citations, inProgress: false });
                return "dataJSON";
            });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    setModalValues = (nom, citation, id) => {
        this.setState({ modalNom: nom, modalCitation: citation, modalId: id });
    }

    render() {
        return (this.state.inProgress ?
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            ><CircularProgress style={{ color: "white" }} /></Grid> :
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
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" style={{ color: "grey", textAlign:"center" }}>
                            Liste des citations
                    </ListSubheader>
                    }
                >
                    {this.state.citations.map((citation) => {
                        return <CitationItemList key={citation.id} citation={citation.citation} nom={citation.nom} id={citation.id} handleOpen={this.handleOpen} handleClose={this.handleClose} setModalValues={this.setModalValues} updateCitations={() => { this.getCitations(); }}></CitationItemList>
                    })}
                    <CitationItemAjout updateCitations={() => { this.getCitations(); }}></CitationItemAjout>
                </List>
                <CitationItemModal citation={this.state.modalCitation} nom={this.state.modalNom} id={this.state.modalId} handleClose={this.handleClose} open={this.state.open} updateCitations={() => { this.getCitations() }}></CitationItemModal>
            </Box>)
    }
}