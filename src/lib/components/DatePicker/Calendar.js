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
  fromDay,
  toDay,
  hoverDay,
  isAnimating
}) => {
  function onSelectDay(day) {
    onSelectDate(`${year}-${month}-${day}`);
  }

  function onHoverDay(day) {
    onHoverDate(`${year}-${month}-${day}`);
  }

  function generateWeek() {
    const weeks = getWeeksInMonth(year, month, 'monday');

    return weeks.map((week, index) => (
      <Week
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        week={week}
        isFirst={index === 0}
        onSelectDay={onSelectDay}
        onHoverDay={onHoverDay}
        fromDay={fromDay}
        toDay={toDay}
        hoverDay={hoverDay}
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
  fromDay: PropTypes.string,
  toDay: PropTypes.string,
  hoverDay: PropTypes.string
};

Calendar.defaultProps = {
  isFirst: false,
  month: null,
  year: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
  fromDay: null,
  toDay: null,
  hoverDay: null
};

export default Calendar;
