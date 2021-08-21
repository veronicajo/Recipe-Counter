# Recipe Counter
## Overview
**Recipe-Counter** is a web application that takes a recipe URL and returns the recipe's list of ingredients, total macronutrients, and a shopping list of ingredients and their cost at Kroger.

This application was created as a one-stop page for users that are interested in cooking, conscious of their food intake (calories, protein, etc.) and cost that goes into a recipe (how much would it cost if I had to buy all the ingredients?).

## Demo Video


## Construction
This was built using React, JavaScript, HTML, CSS, and Node.js. 

The application incorporates the use of 3 microservices:
1. [Recipe scraper](https://github.com/veronicajo/Recipe-Scraper) that scrapes the given recipe URL's HTML and returns the list of ingredients and their amounts.
2. Nutritional API that returns the macronutrient of an ingredient in a given amount (grams). (Teammate's microservice.)
3. [Kroger price scraper](https://github.com/veronicajo/Kroger-Price-Scraper) that scrapes the Kroger website for a given search term and returns the first result's product name and price.