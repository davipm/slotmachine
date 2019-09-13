import React from 'react';
import PropTypes from 'prop-types';

export default function Button({children, handleClick, variant, disabled}) {
  let className = [
    'btn ',
    variant === 'start' ? 'btn-start' : '',
    variant === 'stop' ? 'btn-stop' : '',
  ];

  return(
    <>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={className.join('').trim()}
      >
        {children}
      </button>
    </>
  )
}

Button.prototype = {
  children: PropTypes.any.isRequired,
  handleClick: PropTypes.func,
  variant: PropTypes.string,
};
