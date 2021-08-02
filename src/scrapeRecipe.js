import React from 'react';

export default class ScrapeRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            ingredientDict: null
        };
    }
    
    componentDidMount() {
        const getUrl = `http://flip1.engr.oregonstate.edu:8402/?url=${this.props.url}`;
        console.log(getUrl)
        fetch(getUrl)
            .then(response => response.json())
            .then(data => this.setState({ingredientDict: data, ready: true}))
    }

    render () {
        const returnData = this.state.ingredientDict;
        console.log(this.state)

        if (this.state.ready === false) return null;
        else { 
            return returnData.map((elem) => 
                <div key={elem}>
                    {elem}
                </div>
            );
        }   
    }
}