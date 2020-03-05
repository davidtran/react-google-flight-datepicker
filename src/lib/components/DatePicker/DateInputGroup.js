import React from 'react';
import PropTypes from 'prop-types';
import DateInput from './DateInput';
import CalendarIcon from '../../assets/svg/calendar.svg';

const DateInputGroup = ({
  showCalendarIcon, inputFocus, handleClickDateInput, fromDate, toDate, handleChangeDate,
}) => {
  function handleClickFromInput() {
    handleClickDateInput('from');
  }
  function handleClickToInput() {
    handleClickDateInput('to');
  }

  function getDateFromValue(action, value) {
    const date = new Date(value);
    if (action === 'prev') {
      date.setDate(date.getDate() - 1);
    } else {
      date.setDate(date.getDate() + 1);
    }

    return date.getTime();
  }

  function handleChangeFromDate(action, value) {
    const date = getDateFromValue(action, value);
    handleChangeDate(date, 'from');
  }

  function handleChangeToDate(action, value) {
    const date = getDateFromValue(action, value);
    handleChangeDate(date, 'to');
  }

  return (
    <div className="date-picker-input">
      {showCalendarIcon
        && <CalendarIcon className="icon-calendar mobile" viewBox="0 0 24 24" />}
      <DateInput
        handleClickDateInput={handleClickFromInput}
        showIcon
        tabIndex="-1"
        isFocus={inputFocus === 'from'}
        value={fromDate}
        placeholder="From date"
        handleChangeDate={handleChangeFromDate}
      />
      <div className="divider" />
      <DateInput
        handleClickDateInput={handleClickToInput}
        tabIndex="0"
        isFocus={inputFocus === 'to'}
        value={toDate}
        fromDate={fromDate}
        placeholder="To date"
        handleChangeDate={handleChangeToDate}
        endDate
      />
    </div>
  );
};

DateInputGroup.propTypes = {
  handleClickDateInput: PropTypes.func,
  showCalendarIcon: PropTypes.bool,
  inputFocus: PropTypes.string,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  handleChangeDate: PropTypes.func,
};

DateInputGroup.defaultProps = {
  handleClickDateInput: () => {},
  showCalendarIcon: false,
  inputFocus: null,
  fromDate: null,
  toDate: null,
  handleChangeDate: () => {},
};

export default DateInputGroup;
