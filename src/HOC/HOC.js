import React, { Component } from 'react';
import PropTypes from 'prop-types';

const BUTTON_CONTEXT = '__button__';

const withButtonContext = Component => {
  const Wrapper = (props, context) => {
    const buttonContext = context[BUTTON_CONTEXT];
    return (
      <div>
        <Component {...props} {...buttonContext} />
      </div>
    );
  };
  Wrapper.contextTypes = {
    [BUTTON_CONTEXT]: PropTypes.object
  };
  Wrapper.displayName = `withText(${Component.name || Component.displayName})`;
  Wrapper.Component = Component;
  return Wrapper;
};

const ThisTextIsRed = ({ status, children }) => (status ? children : null);
const ThisTextIsBlue = ({ status, children }) => (status ? null : children);

const ColoredButton = ({ color, handleButtonClick }) => (
  <button onClick={handleButtonClick} style={{ color }}>
    press me
  </button>
);

const TextIsTrueWithContext = withButtonContext(ThisTextIsRed);
const TextIsFalseWithContext = withButtonContext(ThisTextIsBlue);
const ColoredButtonWithContext = withButtonContext(ColoredButton);

class ButtonContextProvider extends Component {
  static ButtonRedText = TextIsTrueWithContext;
  static ButtonBlueText = TextIsFalseWithContext;
  static Button = ColoredButtonWithContext;
  static childContextTypes = {
    [BUTTON_CONTEXT]: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      color: 'red',
      handleButtonClick: this.handleButtonClick
    };
  }

  getChildContext() {
    return {
      [BUTTON_CONTEXT]: {
        status: this.state.status,
        color: this.state.color,
        handleButtonClick: this.state.handleButtonClick
      }
    };
  }

  handleButtonClick = () => {
    const { color } = this.state;
    color === 'red' ? this.setState({ color: 'blue' }) : this.setState({ color: 'red' });
    this.setState(({ status }) => ({
      status: !status
    }));
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default ButtonContextProvider;
