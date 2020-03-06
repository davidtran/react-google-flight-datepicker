import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import List from 'react-virtualized/dist/commonjs/List';

import MonthCalendar from './MonthCalendar';
import { getMonthInfo, getWeekDay } from '../../helpers';

const DialogContentMobile = ({
  fromDate,
  toDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
  startWeekDay,
}) => {
  const calendarContentRef = useRef(null);
  const [sizeList, setSizeList] = useState({ width: 0, height: 0 });
  const [scrollToIndex, setScrollToIndex] = useState(0);

  useEffect(() => {
    const date = fromDate ? new Date(fromDate) : new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const index = parseInt((year - 1900) * 12 + month, 10);
    setScrollToIndex(index);

    if (calendarContentRef.current) {
      setTimeout(() => {
        const calendarRect = calendarContentRef.current.getBoundingClientRect();
        setSizeList({
          width: calendarRect.width,
          height: calendarRect.height,
        });
      }, 200);
    }
  }, []);

  // eslint-disable-next-line react/prop-types
  function rowRenderer({ key, index, style }) {
    const year = 1900 + Math.floor(index / 12);
    const month = index - (Math.floor(index / 12) * 12);

    return (
      <div key={key} style={style}>
        <MonthCalendar
          month={month}
          year={year}
          onSelectDate={onSelectDate}
          onHoverDate={onHoverDate}
          fromDate={fromDate}
          toDate={toDate}
          hoverDate={hoverDate}
          startWeekDay={startWeekDay}
        />
      </div>
    );
  }

  function getRowHeight({ index }) {
    const year = 1900 + Math.floor(index / 12);
    const month = index - (Math.floor(index / 12) * 12);
    const { totalWeek } = getMonthInfo(year, month, 'monday');

    return totalWeek.length * 48 + 34;
  }

  function renderMonthCalendars() {
    return (
      <List
        width={sizeList.width}
        height={sizeList.height}
        rowCount={2400}
        rowHeight={getRowHeight}
        scrollToIndex={scrollToIndex}
        rowRenderer={rowRenderer}
      />
    );
  }

  function generateWeekDay() {
    const arrWeekDay = getWeekDay(startWeekDay);

    return arrWeekDay.map((day, index) => (
      <div className="weekday" key={index}>{day}</div>
    ));
  }

  return (
    <div className="calendar-wrapper">
      <div className="calendar-content" ref={calendarContentRef}>
        <div className="weekdays mobile">
          {generateWeekDay()}
        </div>
        {renderMonthCalendars()}
      </div>
    </div>

  );
};

DialogContentMobile.propTypes = {
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  hoverDate: PropTypes.instanceOf(Date),
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  startWeekDay: PropTypes.string,
};

DialogContentMobile.defaultProps = {
  fromDate: null,
  toDate: null,
  hoverDate: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
  startWeekDay: null,
};

export default DialogContentMobile;
