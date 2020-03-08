import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Week from './Week';
import { getMonthInfo, months, getWeekDay } from '../../helpers';

const MonthCalendar = ({
  hidden,
  month,
  year,
  onSelectDate,
  onHoverDate,
  fromDate,
  toDate,
  hoverDate,
  isAnimating,
  startWeekDay,
  minDate,
  maxDate,
}) => {
  function generateWeek() {
    const { totalWeek, totalDay } = getMonthInfo(year, month, startWeekDay);

    return totalWeek.map((week, index) => (
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
        totalDay={totalDay}
        minDate={minDate}
        maxDate={maxDate}
      />
    ));
  }

  function generateWeekDay() {
    const arrWeekDay = getWeekDay(startWeekDay);

    return arrWeekDay.map((day, index) => (
      <div className="weekday" key={index}>{day}</div>
    ));
  }

  return (
    <div
      className={cx('month-calendar', {
        isAnimating,
        hidden,
      })}
    >
      <div className="month-name">
        {months[month]}
        {' '}
        -
        {' '}
        {year}
      </div>
      <div className="weekdays">
        {generateWeekDay()}
      </div>
      {generateWeek()}
    </div>
  );
};

MonthCalendar.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  hoverDate: PropTypes.string,
  hidden: PropTypes.bool,
  isAnimating: PropTypes.bool,
  startWeekDay: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
};

MonthCalendar.defaultProps = {
  month: null,
  year: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
  fromDate: null,
  toDate: null,
  hoverDate: null,
  hidden: false,
  isAnimating: false,
  startWeekDay: null,
  minDate: null,
  maxDate: null,
};

export default MonthCalendar;
