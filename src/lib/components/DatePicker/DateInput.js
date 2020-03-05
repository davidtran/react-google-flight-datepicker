import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as CalendarIcon } from '../../assets/svg/calendar.svg';
import { ReactComponent as PrevIcon } from '../../assets/svg/prev.svg';
import { ReactComponent as NextIcon } from '../../assets/svg/next.svg';

import { days, months } from '../../helpers';

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
}) => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    if (value) {
      const newDate = new Date(value);
      const date = newDate.getDate();
      const day = days[newDate.getDay()];
      const month = months[newDate.getMonth()].substr(0, 3);
      const text = `${day}, ${date} ${month}`;

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
};

export default DateInput;
