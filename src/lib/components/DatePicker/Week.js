import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Day from './Day';

const Week = ({
  isFirst, week, month, year, fromDate, toDate, hoverDate, onSelectDate, onHoverDate, totalDay,
}) => {
  function generateDay() {
    return [...Array(week.days).keys()].map(index => {
      const dateIndex = index + week.start;
      const dateValue = new Date(year, month, dateIndex).getTime();
      const selected = dateValue === fromDate || dateValue === toDate;
      let hovered = false;
      if (fromDate && fromDate !== toDate) {
        if (toDate && (fromDate <= dateValue && toDate >= dateValue)) {
          hovered = true;
        }
        if (!toDate && (fromDate <= dateValue && hoverDate >= dateValue) && fromDate < hoverDate) {
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
          isEndDay={isEndDate}
          totalDay={totalDay}
        />
      );
    });
  }

  return (
    <div className={cx('week', { first: isFirst })}>
      {generateDay()}
    </div>
  );
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
};

export default Week;
