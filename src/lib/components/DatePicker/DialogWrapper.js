import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const DialogWrapper = ({ children, isMobile }) => (isMobile ? createPortal(
  <div className="react-google-flight-datepicker">
    {children}
  </div>,
  document.querySelector('body'),
) : (<>{children}</>));

DialogWrapper.propTypes = {
  children: PropTypes.node,
  isMobile: PropTypes.string,
};

DialogWrapper.defaultProps = {
  children: null,
  isMobile: false,
};

export default DialogWrapper;
