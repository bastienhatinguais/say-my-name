import React from "react";
import {
    ListItem, ListItemText, Typography, IconButton
} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import PropositionList from "../proposition/propositionList";
import DeleteIcon from '@material-ui/icons/Delete';

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


class EnonceItemList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            question: props.question,
            open: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                id: this.props.id,
                question: this.props.question
            })
        }
    }

    deleteEnonce(id) {
        const url = "http://webmmi.iut-tlse3.fr/~htb2530a/saymyname/delete_enonce.php?id=" + id;
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
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleClick = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <ListItem button onClick={this.handleClick} style={{paddingLeft:"50px"}}>
                    <ListItemText primary={<Typography type="body2" style={{ maxWidth: "90%" }}>{this.state.question}</Typography>} />
                    <IconButton edge="end" aria-label="delete" onClick={(e) => { this.deleteEnonce(this.state.id); e.stopPropagation(); }
                    }>
                        <DeleteIcon />
                    </IconButton>
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}

                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <PropositionList idQuestion={this.state.id}></PropositionList>
                </Collapse>
            </div>)
    }
}

export default withStyles(styles)(EnonceItemList)