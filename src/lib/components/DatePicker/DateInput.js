import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';

import CalendarIcon from '../../assets/svg/calendar.svg';
import PrevIcon from '../../assets/svg/prev.svg';
import NextIcon from '../../assets/svg/next.svg';

const DateInput = ({
  handleClickDateInput,
  showIcon,
  tabIndex,
  isFocus,
  value,
  placeholder,
  handleChangeDate,
  fromDate,
  endDate,
  dateFormat,
}) => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    if (value) {
      const newDate = dayjs(value);
      let text = newDate.format('ddd, DD MMM');
      if (dateFormat) {
        text = newDate.format(dateFormat);
      }
      setFormattedDate(text);
    } else {
      setFormattedDate(null);
    }
  }, [value]);

  function prevDate(e) {
    e.stopPropagation();
    handleChangeDate('prev', value);
  }

  function nextDate(e) {
    e.stopPropagation();
    handleChangeDate('next', value);
  }

  return (
    <div
      className={cx('date', { 'is-focus': isFocus, 'end-date': endDate })}
      role="button"
      tabIndex={tabIndex}
      onClick={handleClickDateInput}
    >
      {showIcon && (
        <CalendarIcon className="icon-calendar" viewBox="0 0 24 24" />
      )}

      <div className="selected-date">
        {
        formattedDate || (
        <div className="date-placeholder">{placeholder}</div>
        )
      }

      </div>
      {formattedDate && (
        <div className="change-date-group">
          <button
            type="button"
            className="btn-outline change-date-button"
            onClick={prevDate}
            disabled={value <= fromDate}
          >
            <PrevIcon viewBox="0 0 24 24" className="icon-arrow" />
          </button>
          <button
            type="button"
            className="btn-outline change-date-button"
            onClick={nextDate}
          >
            <NextIcon viewBox="0 0 24 24" className="icon-arrow" />
          </button>
        </div>
      )}
    </div>
  );
};

DateInput.propTypes = {
  handleClickDateInput: PropTypes.func,
  showIcon: PropTypes.bool,
  tabIndex: PropTypes.string,
  isFocus: PropTypes.bool,
  value: PropTypes.instanceOf(Date),
  fromDate: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  handleChangeDate: PropTypes.func,
  endDate: PropTypes.bool,
  dateFormat: PropTypes.string,
};

DateInput.defaultProps = {
  handleClickDateInput: () => {},
  showIcon: false,
  tabIndex: '',
  isFocus: false,
  value: null,
  fromDate: null,
  placeholder: null,
  handleChangeDate: () => {},
  endDate: false,
  dateFormat: '',
};

export default DateInput;
