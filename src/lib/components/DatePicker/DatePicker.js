import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import DateInputGroup from './DateInputGroup';
import Dialog from './Dialog';

const DatePicker = ({ startDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [inputFocus, setInputFocus] = useState('to');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(true);

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

  function handleClickDateInput(inputFocus) {
    if (!isOpen) {
      setIsOpen(true);
    }

    if (inputFocus === 'to' && !fromDate) {
      return;
    }

    setInputFocus(inputFocus);
  }

  function onSelectDate(date) {
    if (inputFocus) {
      if (inputFocus === 'from' || (fromDate && date < fromDate)) {
        setFromDate(date);
        if (toDate && date > toDate) {
          setToDate(null);
        }
        setInputFocus('to');
      } else {
        setToDate(date);
        setInputFocus(null);
      }
    } else {
      setFromDate(date);
      setInputFocus('to');
      if (toDate && date > toDate) {
        setToDate(null);
      }
    }
  }

  function onHoverDate(date) {
    setHoverDate(date);
  }

  function handleReset() {
    setInputFocus('from');
    setFromDate(null);
    setToDate(null);
    setHoverDate(null);
  }

  function handleChangeDate(value, input) {
    if (input === 'from') {
      setInputFocus('from');
      setFromDate(value);
      if (value > toDate) {
        setToDate(null);
      }
    } else {
      setInputFocus('to');
      setToDate(value);
    }
  }

  return (
    <div className="date-picker" ref={containerRef}>
      <DateInputGroup
        handleClickDateInput={handleClickDateInput}
        showCalendarIcon
        fromDate={fromDate}
        toDate={toDate}
        handleChangeDate={handleChangeDate}
      />
      <Dialog
        isOpen={isOpen}
        toggleDialog={toggleDialog}
        startDate={startDate}
        handleClickDateInput={handleClickDateInput}
        inputFocus={inputFocus}
        setInputFocus={setInputFocus}
        onSelectDate={onSelectDate}
        onHoverDate={onHoverDate}
        fromDate={fromDate}
        toDate={toDate}
        hoverDate={hoverDate}
        handleReset={handleReset}
        handleChangeDate={handleChangeDate}
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
