import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Form from "./components/Form";

class App extends Component {
  state = {
    recipes: []
  };

  getRecipe = async e => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=79cdeb4cc5e162e2a8753d563ace7027&q={${recipeName}}&count=5`
      )
      .then(res => {
        let data = res.data;
        this.setState({
          recipes: data.recipes
        });
        console.log(this.state.recipes);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        { this.state.recipes.map(recipe => {
          return <p key={recipe.recipe_id}>{ recipe.title }</p>
        })}
      </div>
    );
  }
}

export default App;
