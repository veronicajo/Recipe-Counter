import React from "react";

export default class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            ingredientDict: this.props.ingredientDict,
            shoppingArray: null
        };
    }

    prepareTerm(searchTerm) {
        if (searchTerm.includes("butter")) {
            if (searchTerm.includes("unsalted")){
                searchTerm = "unsalted%butter";
            } else {
                searchTerm = "salted%butter";
            }
        }
        if (searchTerm.includes("or ")) {
            searchTerm = searchTerm.replace(/^.*or\W/, "");
        }

        if (searchTerm.includes(" ")) {
            searchTerm = searchTerm.replaceAll(" ", "%");
        }
        return searchTerm
    }

    componentDidMount() {
        const ingredientDict = this.state.ingredientDict
        var shoppingArray = [<h2>Purchasing Ingredients From Kroger's</h2>];
        var costs = [];
        for (var i=0; i < ingredientDict.length; i++) {
            var searchTerm = this.prepareTerm(ingredientDict[i].ingredient);

            if (searchTerm.includes("water")) {
                shoppingArray.push(`Free - ${searchTerm.replaceAll("%", " ")}`);
            } else {
                this.makeRequest(searchTerm, shoppingArray, costs);
            }
        }
    }

    checkIfDone(shoppingArray, costs) {
        if (shoppingArray.length === this.state.ingredientDict.length + 1) {
            var sum = costs.reduce(function(acc, val) {
                return acc + val;
            }, 0);
            const totalStr = "total cost to purchase all ingredients available at Kroger";
            shoppingArray.push(
                <p>
                    ${sum.toFixed(2)} - {totalStr}
                </p>);
            this.setState({
                ready: true,
                shoppingArray: shoppingArray});
        }
    }

    addToShoppingArray(data, shoppingArray, costs) {
        var tempStr = `$${data.price} - ${data.itemDesc}`;
        shoppingArray.push(tempStr);
        costs.push(parseFloat(data.price));
        this.checkIfDone(shoppingArray, costs);
    }

    makeRequest(searchTerm, shoppingArray, costs) {
        var getUrl = `http://flip1.engr.oregonstate.edu:8403/?search=${searchTerm}`
        fetch(getUrl)
            .then(response => response.json())
            .then(data => {
                if (data.price === "No results.") {
                    var newSearchTerm = searchTerm.replace(/^.*?%/, "");
                    fetch(`http://flip1.engr.oregonstate.edu:8403/?search=${newSearchTerm}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.price === "No results.") {
                                searchTerm = searchTerm.replaceAll("%", " ");
                                var tempStr = `We couldn't find this item! - ${searchTerm}`;
                                shoppingArray.push(tempStr);
                                this.checkIfDone(shoppingArray, costs);
                            } else {
                                this.addToShoppingArray(data, shoppingArray, costs)
                            }
                        });
                } else {
                    this.addToShoppingArray(data, shoppingArray, costs)
                }
            });
    }

    render () {
        if (this.state.ready) {
            return this.state.shoppingArray.map((elem, i) => 
            <div key={i}>
                {elem}
            </div>
        )} else {
            return null
        }
    }
}