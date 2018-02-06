import React, { Component } from 'react';
import ButtonContextProvider from './HOC/HOC';
import ButtonRenderProps from './RenderProps/RenderProps';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>HOC</div>
        <ButtonContextProvider>
          <ButtonContextProvider.Button />
          <ButtonContextProvider.ButtonRedText>Button text is red </ButtonContextProvider.ButtonRedText>
          <ButtonContextProvider.ButtonBlueText>Button text is blue </ButtonContextProvider.ButtonBlueText>
        </ButtonContextProvider>
        <br />
        <div>RenderProps</div>
        <ButtonRenderProps>
          {(btnStatus, btnColor, stateUpdater) => (
            <div>
              <button
                style={{ color: btnColor }}
                onClick={stateUpdater(!btnStatus, btnColor === 'red' ? 'blue' : 'red')}
              >
                press me
              </button>
              <div>Status is {btnStatus.toString()}</div>
            </div>
          )}
        </ButtonRenderProps>
      </div>
    );
  }
}

export default App;
