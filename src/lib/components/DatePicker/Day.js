import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Day = ({
  dateIndex,
  dateValue,
  selected,
  hovered,
  disabled,
  onSelectDate,
  onHoverDate,
  isEndDay,
  totalDay,
  highlight,
}) => {
  function selectDate(e) {
    e.stopPropagation();
    e.preventDefault();

    if (disabled) return;
    onSelectDate(dateValue);
  }

  function handleHoverDate() {
    if (disabled || !onHoverDate) return;
    onHoverDate(dateValue);
  }

  return (
    <div
      className={cx('day', {
        selected,
        hovered,
        disabled,
        highlight,
        end: isEndDay,
      })}
      onClick={selectDate}
      onMouseEnter={handleHoverDate}
      role="button"
      tabIndex="-1"
      data-day-index={dateIndex}
      data-date-value={dateValue}
    >
      {hovered
        && !(isEndDay && dateIndex === totalDay)
        && !(dateIndex === 1 && selected && !isEndDay) && (
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
  disabled: PropTypes.bool,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  totalDay: PropTypes.number,
  highlight: PropTypes.bool,
};

Day.defaultProps = {
  dateIndex: null,
  dateValue: null,
  isEndDay: false,
  selected: false,
  hovered: false,
  disabled: false,
  totalDay: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
  highlight: false,
};

export default Day;
