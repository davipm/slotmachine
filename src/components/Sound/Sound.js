import React from 'react';
import PropTypes from 'prop-types';

import win from '../../assets/sound/win.wav';
import fail from '../../assets/sound/fail.wav';
import coin from '../../assets/sound/coin.wav';

const sound = {
  win,
  fail,
  coin
};

const Sound = ({ audio }) => (
  <audio autoPlay="autoplay" preload="false">
    <source src={sound[audio]} />
  </audio>
);

Sound.propTypes = {
  audio: PropTypes.string.isRequired
};

export default Sound;
