import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class FoodListItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (value, event) => {
        this.props.onFoodSelect(value);
        event.preventDefault();
    };

    render() {
        return (
            <ListItem button onClick={(event) => this.handleClick(this.props.value.ndbno, event)}>
                <ListItemText primary={this.props.value.name.toUpperCase()} />
            </ListItem>
        );
    }
}


export default withStyles(styles)(class ResultsList extends React.Component {
    constructor(props) {
        super(props);
    };

    render () {
        const { classes, foods } = this.props;
        const listItems = foods.map((food) =>
            <FoodListItem onFoodSelect={this.props.onFoodSelect} key={food.ndbno} value={food} />);

        return (
            <div className={classes.root}>
                <List component="nav">
                    {listItems}
                </List>
            </div>
        )};
});
