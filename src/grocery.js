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

    componentDidMount() {
        const ingredientDict = this.state.ingredientDict
        console.log(ingredientDict)
        var shoppingArray = [<h2>Purchasing Ingredients From Kroger's</h2>];
        var costs = [];
        for (var i=0; i < ingredientDict.length; i++) {
            var tempStr = "";
            var searchTerm = ingredientDict[i].ingredient;

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

            if (searchTerm.includes("water")) {
                tempStr = `Free - ${searchTerm.replaceAll("%", " ")}`;
                shoppingArray.push(tempStr);
            } else {
                this.makeRequest(searchTerm, tempStr, shoppingArray, costs);
            }
        }
    }

    makeRequest(searchTerm, tempStr, shoppingArray, costs) {
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
                                tempStr = `We couldn't find this item! - ${searchTerm}`;
                                shoppingArray.push(tempStr);
                                if (shoppingArray.length === this.state.ingredientDict.length + 1) {
                                    var sum = costs.reduce(function(acc, val) {
                                        return acc + val;
                                    }, 0);
                                    shoppingArray.push(<p>${sum.toFixed(2)} - total cost to purchase all ingredients available at Kroger</p>);
                                    this.setState({
                                        ready: true,
                                        shoppingArray: shoppingArray});
                                }
                            } else {
                                tempStr = `$${data.price} - ${data.itemDesc}`;
                                shoppingArray.push(tempStr);
                                costs.push(parseFloat(data.price));
                                if (shoppingArray.length === this.state.ingredientDict.length + 1) {
                                    var sum = costs.reduce(function(acc, val) {
                                        return acc + val;
                                    }, 0);
                                    shoppingArray.push(<p>${sum.toFixed(2)} - total cost to purchase all ingredients available at Kroger</p>);
                                    this.setState({
                                        ready: true,
                                        shoppingArray: shoppingArray});
                                }
                            }
                        });
                } else {
                    tempStr = `$${data.price} - ${data.itemDesc}`;
                    shoppingArray.push(tempStr);
                    costs.push(parseFloat(data.price));
                    if (shoppingArray.length === this.state.ingredientDict.length + 1) {
                        var sum = costs.reduce(function(acc, val) {
                            return acc + val;
                        }, 0);
                        shoppingArray.push(<p>${sum.toFixed(2)} - total cost to purchase all ingredients available at Kroger</p>);
                        this.setState({
                            ready: true,
                            shoppingArray: shoppingArray});
                    }
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