import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import cx from 'classnames';
import PrevIcon from '../../assets/svg/prev.svg';
import NextIcon from '../../assets/svg/next.svg';
import BackIcon from '../../assets/svg/back.png';
import DateInputGroup from './DateInputGroup';
import MonthCalendar from './MonthCalendar';

const Dialog = ({
  toggleDialog,
  isOpen,
  focusDate,
  increaseFocusDate,
  decreaseFocusDate,
}) => {
  const [hideAnimation, setHideAnimation] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [inputFocus, setInputFocus] = useState('from');
  const [translateAmount, setTranslateAmount] = useState(0);

  useEffect(() => {
    if (isOpen && !hideAnimation) {
      setHideAnimation(true);
    }
  }, [isOpen]);

  function onSelectDate(date) {
    if (inputFocus) {
      if (inputFocus === 'from' || (fromDate && new Date(date) < new Date(fromDate))) {
        setFromDate(date);
        setInputFocus('to');
      } else {
        setToDate(date);
        setInputFocus(null);
      }
    } else {
      setFromDate(date);
      setInputFocus('to');
      if (toDate && new Date(date) > new Date(toDate)) {
        setToDate(null);
      }
    }
  }

  function onHoverDate(date) {
    setHoverDate(date);
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
    const prevMonth = dayjs(focusDate).subtract(1, 'month').toDate();
    const nextMonth = dayjs(focusDate).add(1, 'month').toDate();
    const futureMonth = dayjs(focusDate).add(2, 'month').toDate();
    const monthArray = [prevMonth, focusDate, nextMonth, futureMonth];

    return monthArray.map((date, dateIndex) => (
      <MonthCalendar
        // eslint-disable-next-line react/no-array-index-key
        key={dateIndex}
        isFirst={date === focusDate}
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

  const datePickerClassName = isOpen ? 'open' : hideAnimation ? 'hide' : '';

  return (
    <div className={`dialog-date-picker ${datePickerClassName}`}>
      <div className="dialog-header">
        <button type="button" className="btn-outline back-button" onClick={toggleDialog}>
          <img src={BackIcon} alt="back-icon" className="back-icon" />
        </button>
        <DateInputGroup inputFocus={inputFocus} />
        <button type="button" className="btn-outline reset-button">Reset</button>
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
      <div className="dialog-footer">
        <button type="button" className="submit-button" onClick={toggleDialog}>Done</button>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  focusDate: PropTypes.instanceOf(Date),
  toggleDialog: PropTypes.func,
  increaseFocusDate: PropTypes.func,
  decreaseFocusDate: PropTypes.func,
};

Dialog.defaultProps = {
  isOpen: false,
  focusDate: null,
  toggleDialog: () => {},
  increaseFocusDate: () => {},
  decreaseFocusDate: () => {},
};

export default Dialog;
