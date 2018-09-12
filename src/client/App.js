import React, { Component } from 'react';
import SearchAppBar from './Components/SearchAppBar';
import ResultsList from './Components/ResultsList';
import NutritionTable from './Components/NutritionTable';
import { withStyles } from '@material-ui/core/styles';
import './app.css';


const styles = (theme) => ({
    toolbar: theme.mixins.toolbar,
});

export default withStyles(styles)(class App extends Component {

    constructor (props) {
        super(props);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
        this.handleFoodSelect = this.handleFoodSelect.bind(this);
        this.handleBackNavigation = this.handleBackNavigation.bind(this);
        this.state = {
            query: '',
            foods: '',
            selectedFood: '',
            selectedFoodInfo: ''
        };
    }

    handleQueryChange(query) {
        this.setState({query: query});
    }

    handleQuerySubmit() {
        fetch('/foods/'+this.state.query)
            .then(res => res.json())
            .then(res => this.setState({
                foods: res.foods,
                selectedFood: '',
                selectedFoodInfo: ''
            }));
    }

    handleFoodSelect(value) {
        this.setState({selectedFood: value});
        fetch('/info/'+value)
            .then(res => res.json())
            .then(res => this.setState({ selectedFoodInfo: res}));
    }

    handleBackNavigation() {
        this.setState({
            selectedFood: '',
            selectedFoodInfo: ''
        });
    }

    render() {
        const { query, foods, selectedFoodInfo } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <SearchAppBar query={query}
                              onQueryChange={this.handleQueryChange}
                                  onQuerySubmit={this.handleQuerySubmit} />
                <div className='main-page'
                     style={{
                         height: '100vh',
                         backgroundImage: 'url("img/carrot.svg")',
                         backgroundPosition: 'center',
                         backgroundRepeat: 'no-repeat',
                         backgroundSize: '10% 10%',}}>
                    <div className={classes.toolbar} />
                    {selectedFoodInfo
                        ? <NutritionTable name={ selectedFoodInfo.desc.name }
                                          nutrients={selectedFoodInfo.nutrients}
                                          onBackNavigation={this.handleBackNavigation} />
                        :                     foods && <ResultsList foods={foods}
                                                                    onFoodSelect={this.handleFoodSelect}/>
                    }
                </div>
            </div>
        );
    }
});
