import { Component } from 'react';

class ButtonRenderProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      color: 'red'
    };
  }
  updateState = (status, color) => () =>
    this.setState({
      status,
      color
    });
  render() {
    return this.props.children(this.state.status, this.state.color, this.updateState);
  }
}

export default ButtonRenderProps;
