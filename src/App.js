import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ScrapeRecipe from './scrapeRecipe';
import GetNutrCost from './nutrition';
import ShoppingList from './grocery';
import BadUrl from './badUrl';

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {url: props.url};
  // }

  handleGo(e) {
    e.preventDefault();
    if (document.getElementById('recipeUrl').value !== "") {
      ReactDOM.render(
        <ScrapeRecipe url={document.getElementById('recipeUrl').value} />,
        document.getElementById('ingredients')
      );
      ReactDOM.render(
        <GetNutrCost />,
        document.getElementById('nutrCost')
      );
      ReactDOM.render(
        <ShoppingList />,
        document.getElementById('groceryList')
      );
    } else {
      ReactDOM.render(
        <BadUrl />,
        document.getElementById('ingredients')
      );
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header" id="main">
            <h1>Recipe Counter</h1>
            <h4>About</h4>
            <p>
              This website takes a recipe URL and does the following:
            </p>
            <ul>
              <li>Prints out the ingredients and the amounts in the recipe.</li>
              <li>Calculates the nutritional information for the entire recipe and each serving (if the number of servings is provided in the recipe).</li>
              <li>Calculates the cost of the ingredients in the recipe and each serving (if the number of servings is provided in the recipe).</li>
              <li>Creates a grocery list of the ingredients with their cost and where they can be purchased.</li>
            </ul>
            <h4>How to Use</h4>
            <p>
              Type or paste the full URL of the recipe you would like to get the nuritional and cost information about. Hit the "GO" button once you have entered the URL.
            </p>
            <form onSubmit={(e) => this.handleGo(e)}>
              <label for="recipeUrl">URL:</label>
              <input type="text" id="recipeUrl" name="recipeUrl" />
              <input type="submit" value="GO" />
            </form>
        </header>
        <header className="App-data" id="ingredients">
        </header>
        <header className="App-data" id="nutrCost">
        </header>
        <header className="App-data" id="groceryList">
        </header>
      </div>
    );
  }
}
