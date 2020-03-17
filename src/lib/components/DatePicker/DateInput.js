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
  dateFormat,
  isSingle,
  onFocus,
  disabled,
  name,
  nonFocusable,
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

  function onDateInputFocus() {
    if (onFocus) onFocus(name);
  }

  return (
    <div
      className={cx('date', { 'is-focus': isFocus, 'is-single': isSingle })}
      role="button"
      tabIndex={nonFocusable ? '-1' : tabIndex}
      onClick={handleClickDateInput}
      onFocus={onDateInputFocus}
      id="start-date-input-button"
    >
      {showIcon && (
        <CalendarIcon className="icon-calendar" viewBox="0 0 24 24" />
      )}

      <div className="selected-date">
        {formattedDate || <div className="date-placeholder">{placeholder}</div>}
      </div>
      {formattedDate && (
        <div className="change-date-group">
          <button
            type="button"
            className="btn-outline change-date-button"
            onClick={prevDate}
            disabled={disabled}
            tabIndex={nonFocusable ? '-1' : '0'}
          >
            <PrevIcon viewBox="0 0 24 24" className="icon-arrow" />
          </button>
          <button
            type="button"
            className="btn-outline change-date-button"
            onClick={nextDate}
            tabIndex={nonFocusable ? '-1' : '0'}
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
  placeholder: PropTypes.string,
  handleChangeDate: PropTypes.func,
  dateFormat: PropTypes.string,
  isSingle: PropTypes.bool,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  nonFocusable: PropTypes.bool,
};

DateInput.defaultProps = {
  handleClickDateInput: () => {},
  showIcon: false,
  tabIndex: '',
  isFocus: false,
  value: null,
  placeholder: null,
  handleChangeDate: () => {},
  dateFormat: '',
  isSingle: false,
  onFocus: () => {},
  disabled: false,
  name: '',
  nonFocusable: false,

};

export default DateInput;
