import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ScrapeRecipe from './scrapeRecipe';
import BadUrl from './badUrl';

export default class App extends React.Component {

  refreshPage() {
    window.location.reload();  
  }
  
  handleGo(e) {
    e.preventDefault();
    const urlInput = document.getElementById('recipeUrl').value;

    if (urlInput !== "" && urlInput.match(/^http/)) {
      ReactDOM.render(
        <ScrapeRecipe url={urlInput}/>,
        document.getElementById('returnedData')
      );
    } else {
        ReactDOM.render(
          <BadUrl />,
          document.getElementById('error')
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
              <li>Calculates the approximate nutritional information for the entire recipe and each serving (if the number of servings is provided in the recipe).</li>
              <li>Calculates the approximate cost of the ingredients in the recipe and each serving (if the number of servings is provided in the recipe).</li>
              <li>Creates a grocery list of the ingredients with their cost and where they can be purchased.</li>
            </ul>
            <h4>How to Use</h4>
            <p>
              Type or paste the full URL of the recipe you would like to get the nuritional and cost information about. Hit the "GO" button once you have entered the URL.
            </p>
            <p>
              You can click on the "RESET" button in order to refresh the page and more easily input a new URL to evaluate. <span class="highlight">NOTE that this action cannot be reversed!</span>
            </p>
            <p>
              The page can be slow to load the nutritional information and the grocery cost list. Please be patient for the data to come through!
            </p>
            <form onSubmit={(e) => this.handleGo(e)}>
              <label for="recipeUrl">URL:</label>
              <input type="text" id="recipeUrl" name="recipeUrl" />
              <input type="submit" value="GO" />
              <input type="button" value="RESET" onClick={this.refreshPage}/>
            </form>
        </header>
        <header className="App-data" id="error">
        </header>
        <header className="App-data" id="returnedData">
        </header>
      </div>
    );
  }
}
