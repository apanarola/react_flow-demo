import React from 'react';
import PropTypes from 'prop-types';

function ButtonComp({ onClick, icon, text, className, size = "sm", iconPosition = "left", ...rest }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-outline-secondary d-flex align-items-center ${size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : ''} ${className}`}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <span className="me-2">
            <img alt='icon' src={icon}/>
        </span>
      )}
      {text && <span>{text}</span>}
      {icon && iconPosition === "right" && (
          <span className="ms-2">
          <img alt='icon' src={icon}/>
          </span>
      )}
    </button>
  );
}

ButtonComp.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.element,
  text: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg', 'md']),
  iconPosition: PropTypes.oneOf(['left', 'right'])
};

ButtonComp.defaultProps = {
  onClick: () => {},
  className: '',
  size: 'sm',
  iconPosition: 'left'
};

export default ButtonComp;
