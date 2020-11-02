import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import monkey from '../../assets/images/monkey.png';
import orange from '../../assets/images/orange.png';
import banana from '../../assets/images/banana.png';
import strawberry from '../../assets/images/strawberry.png';

Spinner.propTypes = {
  spin: PropTypes.bool.isRequired,
  onStop: PropTypes.func.isRequired
};

export default function Spinner({ onStop, spin }) {
  const [spinning, setSpinning] = useState(false);
  const [wheels, setWheels] = useState([]);
  const [prevSpin, setPrevSpin] = useState(null);

  let images = [
    monkey,
    orange,
    banana,
    strawberry
  ];

  useEffect(() => {
    setWheels([randomImage(), randomImage(), randomImage()])
  }, []);

  useEffect(() => {
    let timer;

    if (spinning) timer = setInterval(() => setSpin(), 50)
    if (!spinning) onStop(wheels)

    return () => clearInterval(timer)
  }, [spinning]);

  if (spin !== prevSpin) {
    setSpinning(prevSpin !== null && spin > prevSpin)
    setPrevSpin(spin)
  }

  function randomImage() {
    return images[Math.floor((Math.random() * images.length))]
  }

  function setSpin() {
    setWheels([randomImage(), randomImage(), randomImage()])
  }

  return wheels.map((wheel, index) => (
    <img
      src={wheel}
      key={index}
      alt="Spinner Item"
      title="Spinner Item"
      className="spinner-img"
    />
  ))
}
