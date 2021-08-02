import React from 'react';

export default class ScrapeRecipe extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {url: props.url};
    // }
    // componentDidMount() {
    //     const getUrl = `http://localhost:10045/?url=${this.props.url}`;
    //     console.log(getUrl)
    //     fetch(getUrl)
    //         .then(response => response.text())
    //         .then(text => console.log(text))
    //         // .then(data => console.log(data))
    // }

    render () {
        const getUrl = `http://localhost:10045/?url=${this.props.url}`;
        console.log(getUrl)
        fetch(getUrl)
            .then(response => response.text())
            .then(text => console.log(text))
            // .then(data => console.log(data))
            
        return(
            <div>
                <h4>Ingredients</h4>
                <p>
                    granulated sugar, 0.5 cup<br />
                    brown sugar, packed, 0.75 cup<br />
                    salt, 1 teaspoon<br />
                    unsalted butter, melted, 0.5 cup<br />
                    egg, 1<br />
                    vanilla extract, 1 teaspoon<br />
                    all-purpose flour, 1.25 cups<br />
                    basking soda, 0.5 teaspoon<br />
                    milk or semi-sweet chocolate chunks, 4 oz<br />
                    dark chocolate chunks, 4 oz<br />
                </p>
            </div>
        );
    }
}