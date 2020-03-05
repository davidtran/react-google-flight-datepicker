import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import List from 'react-virtualized/dist/commonjs/List';

import MonthCalendar from './MonthCalendar';
import { getMonthInfo } from '../../helpers';

const DialogContentMobile = ({
  isOpen,
  fromDate,
  toDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
}) => {
  const calendarContentRef = useRef(null);
  const [sizeList, setSizeList] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isOpen) {
      if (calendarContentRef.current) {
        const calendarRect = calendarContentRef.current.getBoundingClientRect();
        setSizeList({
          width: calendarRect.width,
          height: calendarRect.height,
        });
      }
    }
  }, [isOpen]);

  // eslint-disable-next-line react/prop-types
  function rowRenderer({ key, index, style }) {
    const year = 1900 + Math.floor(index / 12);
    const month = index - (Math.floor(index / 12) * 12) + 1;

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
        />
      </div>
    );
  }

  function getRowHeight({ index }) {
    const year = 1900 + Math.floor(index / 12);
    const month = index - (Math.floor(index / 12) * 12) + 1;
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
        scrollToIndex={1443}
        rowRenderer={rowRenderer}
      />
    );
  }

  return (
    <div className="calendar-wrapper">
      <div className="calendar-content" ref={calendarContentRef}>
        {renderMonthCalendars()}
      </div>
    </div>

  );
};

DialogContentMobile.propTypes = {
  isOpen: PropTypes.bool,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  hoverDate: PropTypes.instanceOf(Date),
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
};

DialogContentMobile.defaultProps = {
  isOpen: false,
  fromDate: null,
  toDate: null,
  hoverDate: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
};

export default DialogContentMobile;
