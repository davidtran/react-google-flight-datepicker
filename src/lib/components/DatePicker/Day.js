import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Day = ({
  dateIndex, dateValue, selected, hovered, onSelectDate, onHoverDate, isEndDay, totalDay,
}) => {
  function selectDate() {
    onSelectDate(dateValue);
  }
  function handleHoverDate() {
    onHoverDate(dateValue);
  }

  return (
    <div
      className={cx('day', {
        selected,
        hovered,
        end: isEndDay,
      })}
      onClick={selectDate}
      onMouseEnter={handleHoverDate}
      role="button"
      tabIndex="0"
    >
      {hovered && !(isEndDay && dateIndex === totalDay) && !(dateIndex === 1 && selected && !isEndDay) && (
      <div
        className={cx('background-day', {
          'first-day': dateIndex === 1,
          'last-day': dateIndex === totalDay,
        })}
      />
      )}
      <div className="text-day">{dateIndex}</div>
    </div>
  );
};

Day.propTypes = {
  dateIndex: PropTypes.number,
  dateValue: PropTypes.string,
  isEndDay: PropTypes.bool,
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  totalDay: PropTypes.number,
};

Day.defaultProps = {
  dateIndex: null,
  dateValue: null,
  isEndDay: false,
  selected: false,
  hovered: false,
  totalDay: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
};

export default Day;
