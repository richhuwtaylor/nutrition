import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
        overflowX: 'auto',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

function MacroRow(props) {
    const { name, value, unit } = props.value;
    const { classes } = props;

    return (
        <TableRow className={classes.row}>
            <CustomTableCell component="th" scope="row">{name}</CustomTableCell>
            <CustomTableCell numeric>{value}{unit}</CustomTableCell>
        </TableRow>
    )
}

export default withStyles(styles)(class NutritionTable extends React.Component {
    constructor(props) {
        super(props);
    };


    render() {
        const { classes, name, nutrients } = this.props;
        const macroRows = nutrients.filter((el) => {return el.group === "Proximates"})
            .map((el) =>
                <MacroRow key={el.nutrient_id} value={el} classes={classes} />
            );

        return (
            <Paper className={classes.root}>
                <Typography variant="title" id="tableTitle">{name}</Typography>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Nutrition</CustomTableCell>
                            <CustomTableCell>(per 100g)</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {macroRows}
                    </TableBody>
                </Table>
                <Button variant="contained" color="primary" className={classes.button}
                        onClick={() => this.props.onBackNavigation()}>
                    <ArrowBackIcon className={classes.leftIcon} />
                    Back
                </Button>
            </Paper>
        )};
});
