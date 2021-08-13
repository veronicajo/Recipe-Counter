import React from 'react';

export default class GetNutrition extends React.Component {
    constructor(props) {
          super(props);
          this.state = {
              ingredientDict: this.props.ingredientDict,
              fullArray: false,
              ready: false
          }
        }
    
    toGrams(item) {
        const teaspoons = ["tsp", "teaspoon", "teaspoons"];
        const tablespoons = ["tbsp", "tablespoon", "tablespoons"];
        const cups = ["cup", "cups"];
        const ounces = ["oz", "ounce", "ounces"];
        const pounds = ["pound", "pounds", "lb", "lbs"];

        const liquids = ["oil", "juice", "extract", "broth"];
        const liqRegex = new RegExp(liquids.join("|"));
        const thickLiq = ["honey", "molasses", "syrup"];
        const tLRegex = new RegExp(thickLiq.join("|"));

        if (item.ingredient.includes("butter")) {
            if (tablespoons.includes(item.measureUnits)) {
                return parseFloat(item.amount) * 14
            } else if (["stick", "sticks"].includes(item.measureUnits)) {
                return parseFloat(item.amount) * 113
            } else if (cups.includes(item.measureUnits)) {
                return parseFloat(item.amount) * 227
            }
        } else if (liqRegex.test(item.ingredient) || ounces.includes(item.measureUnits)) {
            if (teaspoons.includes(item.measureUnits)) {
                return parseFloat(item.amount) * 5
            } else if (tablespoons.includes(item.measureUnits)) {
                return parseFloat(item.amount) * 15
            } else if (cups.includes(item.measureUnits)) {
                return parseFloat(item.amount) * 537
            } else if (ounces.includes(item.measureUnits)) {
                return parseFloat(item.amount) * 30
            }
        } else if (item.ingredient.includes("sugar")) {
            if (item.ingredient.includes("brown")) {
                item.ingredient = "brown sugar";
                return parseFloat(item.amount) * 220
            } else {
                item.ingredient = "granulated sugar";
                return parseFloat(item.amount) * 201
            }
        } else if (tLRegex.test(item.ingredient)) {
            if (tablespoons.includes(item.measureUnits)) {
                return parseFloat(item.amount) * 21.5
            } else {
                return parseFloat(item.amount) * 340
            }
        } else if (pounds.includes(item.measureUnits)) {
            return parseFloat(item.amount) * 453.592
        } else if ((/egg/).test(item.ingredient)) {
            return parseFloat(item.amount) * 53
        } else if ((/clove/).test(item.ingredient) && (/garlic/).test(item.ingredient)) {
            return parseFloat(item.amount) * 5.5
        } else {
            if (teaspoons.includes(item.measureUnits)) {
                return parseFloat(item.amount) * 4.76
            } else if (tablespoons.includes(item.measureUnits)) {
                return parseFloat(item.amount) * 14.3
            } else if (cups.includes(item.measureUnits)) {
                return parseFloat(item.amount) * 128
            } else {
                this.setState({ready: true})
                return 0
            }
        }
    }

    makeRequest(ingrInfo, nutrInfo) {
        var getUrl = `https://get-nutritionals.herokuapp.com/api?item=${ingrInfo.name}&qty=${ingrInfo.qty}`
        fetch(getUrl)
            .then(response => response.json())
            .then(data => {
                var tempArr = [];
                tempArr.push(parseFloat(data.calories));
                tempArr.push(parseFloat(data.protein));
                tempArr.push(parseFloat(data.fat));
                tempArr.push(parseFloat(data.carbs));
                nutrInfo.push(tempArr);
                if (nutrInfo.length === this.state.ingredientDict.length) {
                    this.sumMacros(nutrInfo);
                } 
            })
            .catch((error) => {
                this.setState({ready: true});
            });
    }

    sumMacros(nutrInfo) {
        var sumArray = [];
        for (var i = 0; i < 4; i++) {
            var tempSum = 0
            for (var j=0; j < nutrInfo.length; j++) {
                tempSum += nutrInfo[j][i];
            }
            sumArray.push(tempSum.toFixed(2));
        }
        this.setState({
            sumArray: sumArray,
            ready: true
        })
    }

    componentDidMount() {
        var nutrInfo = [];
        const count = this.state.ingredientDict.length
        var i = 0
        while (i < count && !(this.state.ready)) {
            var item = this.state.ingredientDict[i];
            var quantity = this.toGrams(item)
            if (quantity) {
                quantity.toFixed(2);
                var ingrInfo = {
                    name: item.ingredient.replaceAll(" ", "%20"), 
                    qty: quantity
                }
                this.makeRequest(ingrInfo, nutrInfo);
                i++;
            } else {
                i = count;
            }
        }
    }

    render () {
        if (this.state.ready && this.state.sumArray) {
            return (
                <div>
                    <h2>
                        Nutrition For Entire Recipe
                    </h2>
                    <p>
                        Calories: {this.state.sumArray[0]} grams<br />
                        Protein: {this.state.sumArray[1]} grams<br />
                        Fat: {this.state.sumArray[2]} grams<br />
                        Carbohydrates: {this.state.sumArray[3]} grams<br />
                    </p>
                </div>
        )} else if (this.state.ready && !(this.state.sumArray)){
            return(
                <div>
                    <h2>
                        Nutrition For Entire Recipe
                    </h2>
                    <p>
                        Sorry! We couldn't find nutritional information for at least one of the ingredients in the recipe!
                    </p>
                </div>
            )
        } else {
            return null
        }
    }
}