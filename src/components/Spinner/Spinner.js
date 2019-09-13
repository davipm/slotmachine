import React, { Component } from 'react';
import PropTypes from 'prop-types';
import monkey from '../../assets/images/monkey.png';
import orange from '../../assets/images/orange.png';
import banana from '../../assets/images/banana.png';
import strawberry from '../../assets/images/strawberry.png';

export default class Spinner extends Component {
  static propTypes = {
    spin: PropTypes.bool.isRequired,
    onStop: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      wheels: [],
    };
  }

  images = [
    monkey,
    orange,
    banana,
    strawberry
  ];

  componentDidMount() {
    this.setState({
      wheels: [ this.randomImage(), this.randomImage(), this.randomImage()]}
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { onStop } = this.props;
    const { spinning, wheels} = this.state;

    if (spinning && (spinning !== prevState.spinning)) {
      this.tick()
    }
    if (!spinning && (spinning !== prevState.spinning)) {
      clearInterval(this.isSpinning);
      onStop(wheels)
    }
  }

  static getDerivedStateFromProps(props) {
    return { spinning: props.spin }
  }

  randomImage = () => this.images[Math.floor((Math.random() * this.images.length))];

  spin = () => this.setState({
    wheels: [this.randomImage(), this.randomImage(), this.randomImage()]
  });

  tick = () => this.isSpinning = setInterval(this.spin, 50);

  render() {
    const { wheels } = this.state;
    return (
      <>
        {wheels.map((wheel, index) => (
          <img
            src={wheel}
            key={index}
            alt="Spinner Item"
            title="Spinner Item"
            className="spinner-img"
          />
        ))}
      </>
    )
  }
}
