import React, {
  useState, useRef, useEffect, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';

import './styles.scss';
import DateInputGroup from './DateInputGroup';
import Dialog from './Dialog';
import DialogWrapper from './DialogWrapper';

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
  highlightToday,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [fromDate, setFromDate] = useState();
  const [hoverDate, setHoverDate] = useState();
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (typeof window !== 'undefined' && window.innerWidth <= 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useLayoutEffect(() => {
    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (startDate) {
      setFromDate(dayjs(startDate));
    }
  }, [startDate]);

  function handleDocumentClick(e) {
    if (
      containerRef.current
      && containerRef.current.contains(e.target) === false
      && window.innerWidth > 500
    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    setIsFirstTime(true);
    if (startDate) {
      setFromDate(dayjs(startDate));
    }

    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(() => {
    if (isFirstTime) {
      const startDate = fromDate ? dayjs(fromDate) : null;
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
    if ((minDate && dayjs(minDate).isAfter(date, 'date')) || (maxDate && dayjs(maxDate).isBefore(date, 'date'))) {
      return;
    }
    setFromDate(date);
  }

  function onHoverDate(date) {
    setHoverDate(date);
  }

  function handleReset() {
    setFromDate(null);
    setHoverDate(null);
  }

  function onDateInputFocus() {
    handleClickDateInput();
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
          minDate={minDate}
          maxDate={maxDate}
          handleChangeDate={onSelectDate}
          startDatePlaceholder={startDatePlaceholder}
          dateFormat={dateFormat}
          onFocus={onDateInputFocus}
          isSingle
        />
        <DialogWrapper isMobile={isMobile}>
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
            isMobile={isMobile}
            highlightToday={highlightToday}
            isSingle
          />
        </DialogWrapper>
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
  highlightToday: PropTypes.bool,
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
  highlightToday: false,
};

export default SingleDatePicker;
