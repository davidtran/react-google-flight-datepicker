import React from 'react';
import PropTypes from 'prop-types';

const DialogWrapper = ({ children }) => <>{children}</>;

DialogWrapper.propTypes = {
  children: PropTypes.node,
};

DialogWrapper.defaultProps = {
  children: null,
};

export default DialogWrapper;
