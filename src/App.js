import React, { Component } from "react";
import { LedMatrix } from "led-matrix";
import { getScreenData, getViews, changeView, getCurrentView } from "./lib/api";
import Views from "./Views";

class App extends Component {
  canvas: null;
  led: null;
  timer: null;

  state = {
    data: new Array(32 * 16).fill(null),
    views: [],
    currentViewIndex: null
  };

  componentDidMount() {
    this.led = new LedMatrix(this.canvas, {
      x: 32,
      y: 16,
      pixelWidth: 20,
      pixelHeight: 20,
      margin: 10
    });
    getViews().then(views =>
      getCurrentView().then(view => {
        const index = views.findIndex(v => v.name === view.name);
        this.setState(state => ({
          ...state,
          views,
          currentViewIndex: index
        }));
      })
    );
    this.timer = setInterval(this.updateScreen.bind(this), 1000 / 4);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async updateScreen() {
    const { data, currentView } = await getScreenData();
    this.setState(
      state => ({
        ...state,
        currentViewIndex: currentView.index,
        data
      }),
      () => {
        this.draw();
      }
    );
  }

  draw() {
    this.led.clear();
    this.led.setData(this.state.data);
    this.led.draw();
  }

  handleClick(index) {
    changeView(index);
  }

  render() {
    const { views, currentViewIndex } = this.state;
    return (
      <div className="app">
        <header>LED Matrix</header>
        <div className="app-canvas">
          <canvas ref={canvas => (this.canvas = canvas)} />
        </div>
        <Views
          views={views}
          index={currentViewIndex}
          onClick={index => this.handleClick(index)}
        />
        <button className="app-nextview" onClick={() => this.handleClick()}>
          Next View
        </button>
      </div>
    );
  }
}

export default App;
