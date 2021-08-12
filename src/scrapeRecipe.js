import React from 'react';
import BadUrl from './badUrl';
import GetNutrition from './nutrition';
import ShoppingList from './grocery';

export default class ScrapeRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            ingredientDict: null,
            ingredientArray: null
        };
    }
    
    componentDidMount() {
        const getUrl = `http://flip1.engr.oregonstate.edu:8402/?url=${this.props.url}`;
        
        fetch(getUrl)
            .then(response => response.json())
            .then(data => {
                if (!(data.error)) {
                    const arrayOnly = data.pop()
                    data.unshift(<h2>Ingredients</h2>);
                    this.setState({
                        ingredientDict: arrayOnly,
                        ingredientArray: data,
                        ready: true
                    });
                } else {
                    this.setState({
                        ingredientArray: data,
                        ready: true
                    });
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            })
    }

    render () {
        const returnData = this.state.ingredientArray;

        if (this.state.ready === false) return null;
        else { 
            if (returnData.error) {
                return(
                    <BadUrl />
                );
            } else {
                this.state.ingredientArray.push(<GetNutrition ingredientDict={this.state.ingredientDict}/>);
                this.state.ingredientArray.push(<ShoppingList ingredientDict={this.state.ingredientDict}/>);

                return returnData.map((elem, i) => 
                    <div key={i}>
                        {elem}
                    </div>
                );
            } 
        }
    }
}