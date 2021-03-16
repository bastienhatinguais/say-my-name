import React from "react";
import {
    ListItem, ListItemText, IconButton,  Typography, 
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import EnonceList from "../enonce/enonceList";


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});


class CitationItemList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nom: props.nom,
            citation: props.citation,
            id: props.id,
            open: false
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

    deleteCitation(id) {
        const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/delete_citation.php?id=" + id;
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
                this.props.updateCitations();
                console.log(dataJSON);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleClick = () => {
        console.log(this.state.open)
        this.setState({ open: !this.state.open })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <ListItem button onClick={this.handleClick}>
                    <ListItemText primary={<Typography type="body2" style={{ maxWidth: "90%", fontSize:"1.2em" }}>{this.state.citation}</Typography>} secondary={this.state.nom} />
                    <IconButton edge="end" aria-label="settings" onClick={(e) => { this.props.setModalValues(this.state.nom, this.state.citation, this.state.id); this.props.handleOpen(); e.stopPropagation() }} >
                        <EditIcon style={{color:"#FFA600"}}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={(e) => { this.deleteCitation(this.state.id); e.stopPropagation(); }
                    }>
                        <DeleteIcon/>
                    </IconButton>
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <EnonceList idMedia={this.state.id}></EnonceList>
                </Collapse>
            </div>)
    }
}

export default withStyles(styles)(CitationItemList)