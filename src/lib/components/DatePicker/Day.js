import React from 'react';
import PropTypes from 'prop-types';

const Day = ({
  dateIndex, dateValue, selected, hovered, onSelectDate, onHoverDate, isEndDay,
}) => (
  <div
    className={`day 
      ${selected ? 'selected' : ''} 
      ${hovered ? 'hovered' : ''}
      ${isEndDay ? 'end' : ''}
    `}
    onClick={() => onSelectDate(dateValue)}
    onMouseEnter={() => onHoverDate(dateValue)}
    role="button"
    tabIndex="0"
  >
    <div className="text-day">{dateIndex}</div>
  </div>
);

Day.propTypes = {
  dateIndex: PropTypes.number,
  dateValue: PropTypes.string,
  isEndDay: PropTypes.bool,
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
};

Day.defaultProps = {
  dateIndex: null,
  dateValue: null,
  isEndDay: false,
  selected: false,
  hovered: false,
  onSelectDate: () => {},
  onHoverDate: () => {},
};

export default Day;
