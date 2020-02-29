import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import './styles.scss';
import DateInputGroup from './DateInputGroup';
import Dialog from './Dialog';

const DatePicker = ({ startDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [focusDate, setFocusDate] = useState(new Date());

  useEffect(() => {
    const date = startDate
      ? new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      : new Date();
    date.setDate(1);
    setFocusDate(date);
  }, [startDate]);

  function handleDocumentClick(e) {
    if (
      containerRef.current
      && containerRef.current.contains(e.target) === false
    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  function toggleDialog() {
    setIsOpen(!isOpen);
  }

  function increaseFocusDate() {
    const nextDate = dayjs(focusDate)
      .add(1, 'month')
      .toDate();
    setFocusDate(nextDate);
  }

  function decreaseFocusDate() {
    const nextFocusDate = dayjs(focusDate)
      .subtract(1, 'month')
      .toDate();
    setFocusDate(nextFocusDate);
  }

  return (
    <div className="date-picker">
      <DateInputGroup toggleDialog={toggleDialog} showCalendarIcon />
      <Dialog
        isOpen={isOpen}
        toggleDialog={toggleDialog}
        focusDate={focusDate}
        increaseFocusDate={increaseFocusDate}
        decreaseFocusDate={decreaseFocusDate}
      />
    </div>
  );
};

DatePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
};

DatePicker.defaultProps = {
  startDate: null,
};

export default DatePicker;
