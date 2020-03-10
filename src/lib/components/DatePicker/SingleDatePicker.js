import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';
import DateInputGroup from './DateInputGroup';
import Dialog from './Dialog';
import { resetTimeDate } from '../../helpers';

const SingleDatePicker = ({
  startDate,
  startDatePlaceholder,
  className,
  disabled,
  onChange,
  onFocus,
  startWeekDay,
  minDate,
  maxDate,
  dateFormat,
  monthFormat,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [fromDate, setFromDate] = useState(startDate);
  const [hoverDate, setHoverDate] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

  function handleDocumentClick(e) {
    if (
      containerRef.current
      && containerRef.current.contains(e.target) === false
    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    setIsFirstTime(true);
    if (startDate) {
      const newStartDate = resetTimeDate(startDate);
      setFromDate(newStartDate.getTime());
    }

    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(() => {
    if (isFirstTime) {
      const startDate = fromDate ? new Date(fromDate) : null;
      onChange(startDate);
    }
  }, [fromDate]);

  function toggleDialog() {
    setIsOpen(!isOpen);
  }

  function handleClickDateInput() {
    if (disabled) return;

    if (!isOpen) {
      setIsOpen(true);
    }

    onFocus('Start Date');
  }

  function onSelectDate(date) {
    setFromDate(date);
  }

  function onHoverDate(date) {
    setHoverDate(date);
  }

  function handleReset() {
    setFromDate(null);
    setHoverDate(null);
  }

  return (
    <div className="react-google-flight-datepicker">
      <div
        className={cx('date-picker', className, {
          disabled,
        })}
        ref={containerRef}
      >
        <DateInputGroup
          handleClickDateInput={handleClickDateInput}
          showCalendarIcon
          fromDate={fromDate}
          handleChangeDate={onSelectDate}
          startDatePlaceholder={startDatePlaceholder}
          dateFormat={dateFormat}
          isSingle
        />
        <Dialog
          isOpen={isOpen}
          toggleDialog={toggleDialog}
          handleClickDateInput={handleClickDateInput}
          inputFocus="from"
          onSelectDate={onSelectDate}
          onHoverDate={onHoverDate}
          fromDate={fromDate}
          hoverDate={hoverDate}
          handleReset={handleReset}
          handleChangeDate={onSelectDate}
          startDatePlaceholder={startDatePlaceholder}
          startWeekDay={startWeekDay}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat={dateFormat}
          monthFormat={monthFormat}
          isSingle
        />
      </div>
    </div>
  );
};

SingleDatePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  startDatePlaceholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  startWeekDay: PropTypes.oneOf(['monday', 'sunday']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  monthFormat: PropTypes.string,
};

SingleDatePicker.defaultProps = {
  startDate: null,
  className: '',
  disabled: false,
  startDatePlaceholder: 'Date',
  onChange: () => {},
  onFocus: () => {},
  startWeekDay: 'monday',
  minDate: null,
  maxDate: null,
  dateFormat: '',
  monthFormat: '',
};

export default SingleDatePicker;
