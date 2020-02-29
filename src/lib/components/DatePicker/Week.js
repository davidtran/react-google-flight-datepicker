import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';

const Week = ({
  isFirst, week, month, year, fromDate, toDate, hoverDate, onSelectDate, onHoverDate,
}) => {
  function generateDay() {
    return [...Array(week.days).keys()].map(index => {
      const dateIndex = index + week.start;
      const dateValue = `${year}-${month}-${dateIndex}`;
      const selected = dateValue === fromDate || dateValue === toDate;
      let hovered = false;
      if (fromDate && fromDate !== hoverDate && fromDate !== toDate) {
        if (toDate && (new Date(fromDate) <= new Date(dateValue) && new Date(toDate) >= new Date(dateValue))) {
          hovered = true;
        }
        if (!toDate && (new Date(fromDate) <= new Date(dateValue) && new Date(hoverDate) >= new Date(dateValue))) {
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
          onSelectDate={onSelectDate}
          onHoverDate={onHoverDate}
          selected={selected}
          hovered={hovered}
          isEndDay={isEndDate}
        />
      );
    });
  }

  return (
    <div className={`week ${isFirst ? 'first' : ''}`}>
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
  hoverDate: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
};

export default Week;
