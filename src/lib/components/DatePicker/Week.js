import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Day from './Day';

const Week = ({
  isFirst,
  week,
  month,
  year,
  fromDate,
  toDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
  totalDay,
  minDate,
  maxDate,
  isSingle,
  weekIndex
}) => {
  function generateDay() {
    return [...Array(week.days).keys()].map(index => {
      const dateIndex = index + week.start;
      const dateValue = new Date(year, month, dateIndex).getTime();
      const disabled =
        (minDate && dateValue < new Date(minDate).getTime()) ||
        (maxDate && dateValue > new Date(maxDate).getTime());
      const selected = dateValue === fromDate || dateValue === toDate;
      let hovered = false;

      if (fromDate && fromDate !== toDate && !isSingle) {
        if (toDate && fromDate <= dateValue && toDate >= dateValue) {
          hovered = true;
        }
        if (
          !toDate &&
          fromDate <= dateValue && hoverDate >= dateValue &&
          fromDate < hoverDate
        ) {
          hovered = true;
        }
      }

      let isEndDate = false;
      if (dateValue === toDate || (!toDate && hoverDate === dateValue)) {
        isEndDate = true;
      }

      return (
        <Day
          key={index}
          dateIndex={dateIndex}
          dateValue={dateValue}
          hoverDate={hoverDate}
          onSelectDate={onSelectDate}
          onHoverDate={onHoverDate}
          selected={selected}
          hovered={hovered}
          disabled={disabled}
          isEndDay={isEndDate}
          totalDay={totalDay}
          weekDayIndex={index}
          weekIndex={weekIndex}
        />
      );
    });
  }

  return <div className={cx('week', { first: isFirst })}>{generateDay()}</div>;
};

Week.propTypes = {
  isFirst: PropTypes.bool,
  week: PropTypes.object,
  month: PropTypes.number,
  year: PropTypes.number,
  fromDate: PropTypes.number,
  toDate: PropTypes.number,
  totalDay: PropTypes.number,
  hoverDate: PropTypes.number,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  isSingle: PropTypes.bool
};

Week.defaultProps = {
  isFirst: false,
  week: {},
  month: null,
  year: null,
  fromDate: null,
  toDate: null,
  totalDay: null,
  hoverDate: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
  minDate: null,
  maxDate: null,
  isSingle: false
};

export default Week;
