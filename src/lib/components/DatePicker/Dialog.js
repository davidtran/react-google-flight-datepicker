import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PrevIcon from '../../assets/svg/prev.svg';
import NextIcon from '../../assets/svg/next.svg';
import BackIcon from '../../assets/svg/back.png';
import DateInputGroup from './DateInputGroup';
import MonthCalendar from './MonthCalendar';

const Dialog = ({
  toggleDialog,
  isOpen,
  startDate,
  fromDate,
  toDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
  handleReset,
  handleClickDateInput,
  inputFocus,
  handleChangeDate,
}) => {
  const [hideAnimation, setHideAnimation] = useState(false);
  const [translateAmount, setTranslateAmount] = useState(0);
  const [monthArray, setMonthArray] = useState([]);
  const [focusDate, setFocusDate] = useState(new Date());

  function getArrayMonth(date) {
    const prevMonth = new Date(new Date(date).setMonth(new Date(date).getMonth() - 1));
    const nextMonth = new Date(new Date(date).setMonth(new Date(date).getMonth() + 1));
    const futureMonth = new Date(new Date(date).setMonth(new Date(date).getMonth() + 2));

    return [prevMonth, focusDate, nextMonth, futureMonth];
  }

  function generateMonthForMobile(year) {
    const arrayMonth = [];
    for (let index = 0; index < 12; index += 1) {
      const date = new Date(year, index, 1);
      arrayMonth.push(date);
    }

    return arrayMonth;
  }

  useEffect(() => {
    const date = startDate
      ? new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      : new Date();
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    setFocusDate(date);
  }, [startDate]);

  useEffect(() => {
    const arrayMonth = getArrayMonth(focusDate);
    // const arrayMonth = generateMonthForMobile(2020);

    setMonthArray(arrayMonth);
  }, [focusDate]);

  useEffect(() => {
    if (isOpen && !hideAnimation) {
      setHideAnimation(true);
    }
  }, [isOpen]);

  function increaseFocusDate() {
    const nextDate = new Date(focusDate.setMonth(focusDate.getMonth() + 1));
    setFocusDate(nextDate);
  }

  function decreaseFocusDate() {
    const nextFocusDate = new Date(focusDate.setMonth(focusDate.getMonth() - 1));
    setFocusDate(nextFocusDate);
  }

  function increaseCurrentMonth() {
    setTranslateAmount(-378);
    setTimeout(() => {
      increaseFocusDate();
      setTranslateAmount(0);
    }, 200);
  }

  function decreaseCurrentMonth() {
    setTranslateAmount(378);
    setTimeout(() => {
      decreaseFocusDate();
      setTranslateAmount(0);
    }, 200);
  }

  function renderMonthCalendars() {
    return monthArray.map((date, dateIndex) => (
      <MonthCalendar
        // eslint-disable-next-line react/no-array-index-key
        key={dateIndex}
        isFirst={new Date(date).getTime() === focusDate.getTime()}
        hidden={dateIndex === 0 && (translateAmount <= 0)}
        isAnimating={dateIndex === 0 && translateAmount > 0}
        month={date.getMonth() + 1}
        year={date.getFullYear()}
        onSelectDate={onSelectDate}
        onHoverDate={onHoverDate}
        fromDate={fromDate}
        toDate={toDate}
        hoverDate={hoverDate}
      />
    ));
  }

  return (
    <div
      className={cx('dialog-date-picker', {
        open: isOpen,
        hide: !isOpen && hideAnimation,
      })}
    >
      <div className="dialog-header">
        <button type="button" className="btn-outline back-button" onClick={toggleDialog}>
          <img src={BackIcon} alt="back-icon" className="back-icon" />
        </button>
        <DateInputGroup
          inputFocus={inputFocus}
          handleClickDateInput={handleClickDateInput}
          fromDate={fromDate}
          toDate={toDate}
          handleChangeDate={handleChangeDate}
        />
        <button
          type="button"
          className="btn-outline reset-button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="dialog-content">
        <div className="calendar-wrapper">
          <div
            className={cx('calendar-content', {
              isAnimating: translateAmount !== 0,
            })}
            style={{
              transform: `translateX(${translateAmount}px)`,
            }}
          >
            {renderMonthCalendars()}
          </div>
          <div className="calendar-flippers">
            <div className="flipper-button" onClick={decreaseCurrentMonth} role="button" tabIndex="-1">
              <PrevIcon viewBox="0 0 24 24" />
            </div>
            <div className="flipper-button" onClick={increaseCurrentMonth} role="button" tabIndex="0">
              <NextIcon viewBox="0 0 24 24" />
            </div>
          </div>
        </div>
      </div>
      <div className="dialog-footer">
        <button type="button" className="submit-button" onClick={toggleDialog}>Done</button>
        <button
          type="button"
          className="btn-outline reset-button mobile"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  inputFocus: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  hoverDate: PropTypes.instanceOf(Date),
  toggleDialog: PropTypes.func,
  handleClickDateInput: PropTypes.func,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  handleReset: PropTypes.func,
  handleChangeDate: PropTypes.func,
};

Dialog.defaultProps = {
  isOpen: false,
  inputFocus: null,
  startDate: null,
  fromDate: null,
  toDate: null,
  hoverDate: null,
  toggleDialog: () => {},
  handleClickDateInput: () => {},
  onSelectDate: () => {},
  onHoverDate: () => {},
  handleReset: () => {},
  handleChangeDate: () => {},
};

export default Dialog;
