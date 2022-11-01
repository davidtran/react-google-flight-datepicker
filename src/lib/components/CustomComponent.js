import React, { memo } from 'react';
import PropTypes from 'prop-types';

const CustomComponent = ({ date }) => (
  <div>
    Hung
    {' '}
    {date}
  </div>
);

CustomComponent.propTypes = {
  date: PropTypes.instanceOf(Date),
};

CustomComponent.defaultProps = {
  date: null,
};

export default memo(CustomComponent);
