import React from "react";
export default class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemesImgs: [],
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  async fetchData() {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    return data.data.memes;
  }

  async componentDidMount() {
    const memesData = await this.fetchData();
    this.setState((prevState) => {
      return {
        ...prevState,
        allMemesImgs: memesData,
      };
    });
    console.log(this.state);
  }

  getRandomMeme() {
    const randomIndex = Math.floor(
      Math.random() * this.state.allMemesImgs.length
    );
    return this.state.allMemesImgs[randomIndex].url;
  }

  handleChange(event) {
   
    const { name, value } = event.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }
    handleClick(event) {
        event.preventDefault();
        const randomMeme = this.getRandomMeme();
        this.setState((prevState) => {
            return {
              ...prevState,
              randomImg: randomMeme,
            };
          });
    }

  render() {
    return (
      <div className="container">
        <form className="meme-form">
          <input
            name="topText"
            placeholder="Top Text "
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick}>Generate!</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="Meme" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
