import React, { Component } from "react";
import GameCard from "./components/GameCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import Body from "./components/Body";
import images from "./images.json";
import "./App.css";

class App extends Component {
  // Setting up the this.state.images
  state = {
    score: 0,
    highscore: 0,
    clickedImages: [],
    Title: "IN A NEW YORK CLICK",
    gameInfo: "CLICK ON AN IMAGE!  DON'T CLICK THE SAME IMAGE TWICE!",
    images
  };

  //handleOnChange callback
  handleOnChange = (props) => {
    this.handleIncrement(props);
    this.handleOnClick(props.id)
    this.shuffleArray(this.state.images)
  }
  //handleIncrement callback
  handleIncrement = (props) => {

    this.setState({ score: this.state.score + 1 });
  };

  // For Loop to shuffle the array
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // logic to reset the score, update the high score if image is clicked twice.
  // logic to provide messages to the user if they click an image twice, if they have correctly clicked an image, or if they win
  handleOnClick = id => {
    if (this.state.clickedImages.includes(id)) {
      this.setState({ score: 0, clickedImages: [] })
      this.setState({ gameInfo: "WHOOPS!  THAT WAS INCORRECT.  CLICK AN IMAGE TO PLAY AGAIN!" })
    } else if (this.state.score === 11) {
      this.setState({ score: 0, clickedImages: [] })
      this.setState({ gameInfo: "YOU WIN!  CLICK AN IMAGE TO PLAY AGAIN!" })
      this.setState({ highscore: 12 })
    }

    else {
      if (this.state.score + 1 > this.state.highscore) {
        this.setState({
          highscore: this.state.score + 1
        })
      }
      this.setState({ gameInfo: "CORRECT! CLICK AGAIN!" })
      this.state.clickedImages.push(id);
      console.log("clicked images" + this.state.clickedImages);
      this.setState({ score: this.state.score + 1 });
      if (this.state.score === 11) {
        this.setState({ gameInfo: "YOU WIN! CLICK ON ANY IMAGE TO PLAY AGAIN!" })
      }
      console.log("SCORE " + this.state.score);
    }
  };

  // Render a GameCard component for each image object
  render() {
    this.shuffleArray(this.state.images);
    console.log(images);

    return (
      <Wrapper>
        <Navbar className="score" score={this.state.score} highscore={this.state.highscore} />
        <Title className="title" Title={this.state.Title} />
        <Body className="body" gameInfo={this.state.gameInfo} />
        {this.state.images.map(images => (
          <GameCard
            handleOnChange={this.handleOnChange}
            handleIncrement={this.handleIncrement}
            id={images.id}
            key={images.id}
            name={images.name}
            image={images.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
