import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Week from './Week';
import { getWeeksInMonth, months } from '../../helpers';

const Calendar = ({
  hidden,
  isFirst,
  month,
  year,
  onSelectDate,
  onHoverDate,
  fromDate,
  toDate,
  hoverDate,
  isAnimating,
}) => {
  function generateWeek() {
    const weeks = getWeeksInMonth(year, month, 'monday');

    return weeks.map((week, index) => (
      <Week
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        week={week}
        month={month}
        year={year}
        isFirst={index === 0}
        onSelectDate={onSelectDate}
        onHoverDate={onHoverDate}
        fromDate={fromDate}
        toDate={toDate}
        hoverDate={hoverDate}
      />
    ));
  }

  return (
    <div
      className={cx('calendar', {
        first: isFirst,
        isAnimating,
        hidden,
      })}
    >
      <div className="calendar-header">{months[month - 1]}</div>
      <div className="weekdays">
        <div className="weekday">M</div>
        <div className="weekday">T</div>
        <div className="weekday">W</div>
        <div className="weekday">T</div>
        <div className="weekday">F</div>
        <div className="weekday">S</div>
        <div className="weekday">S</div>
      </div>
      {generateWeek()}
    </div>
  );
};

Calendar.propTypes = {
  isFirst: PropTypes.bool,
  month: PropTypes.number,
  year: PropTypes.number,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  hoverDate: PropTypes.string,
  hidden: PropTypes.bool,
  isAnimating: PropTypes.bool,
};

Calendar.defaultProps = {
  isFirst: false,
  month: null,
  year: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
  fromDate: null,
  toDate: null,
  hoverDate: null,
  hidden: false,
  isAnimating: false,
};

export default Calendar;
