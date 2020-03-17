import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import PrevIcon from '../../assets/svg/prev.svg';
import NextIcon from '../../assets/svg/next.svg';
import MonthCalendar from './MonthCalendar';
import {
  resetTimeDate, getLastDateOfMonth, addDays, monthDiff,
} from '../../helpers';

const DialogContentDesktop = ({
  fromDate,
  toDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
  startWeekDay,
  minDate,
  maxDate,
  monthFormat,
  isSingle,
  isOpen,
}) => {
  const containerRef = useRef();
  const [translateAmount, setTranslateAmount] = useState(0);
  const [monthArray, setMonthArray] = useState([]);
  const [focusDate, setFocusDate] = useState(new Date());
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  function getArrayMonth(date) {
    const prevMonth = new Date(
      new Date(date).setMonth(new Date(date).getMonth() - 1),
    );
    const nextMonth = new Date(
      new Date(date).setMonth(new Date(date).getMonth() + 1),
    );
    const futureMonth = new Date(
      new Date(date).setMonth(new Date(date).getMonth() + 2),
    );

    return [prevMonth, focusDate, nextMonth, futureMonth];
  }

  useEffect(() => {
    let date = fromDate ? new Date(fromDate) : new Date();
    date = resetTimeDate(date);
    date.setDate(1);
    setFocusDate(date);
  }, [isOpen]);

  useEffect(() => {
    const newFocusDate = resetTimeDate(focusDate);
    newFocusDate.setDate(1);

    if (minDate) {
      const newMinDate = resetTimeDate(minDate);
      newMinDate.setDate(1);

      if (newMinDate.getTime() >= newFocusDate.getTime()) {
        setDisablePrev(true);
      } else {
        setDisablePrev(false);
      }
    }

    if (maxDate) {
      const newMaxDate = resetTimeDate(maxDate);
      newMaxDate.setDate(1);
      const nextDate = resetTimeDate(
        new Date(focusDate).setMonth(new Date(focusDate).getMonth() + 1),
      );
      nextDate.setDate(1);

      if (newMaxDate.getTime() <= nextDate.getTime()) {
        setDisableNext(true);
      } else {
        setDisableNext(false);
      }
    }

    const arrayMonth = getArrayMonth(focusDate);
    setMonthArray(arrayMonth);
  }, [focusDate]);

  function increaseFocusDate() {
    const nextDate = new Date(focusDate.setMonth(focusDate.getMonth() + 1));
    setFocusDate(nextDate);
  }

  function decreaseFocusDate() {
    const nextFocusDate = new Date(
      focusDate.setMonth(focusDate.getMonth() - 1),
    );
    setFocusDate(nextFocusDate);
  }

  function increaseCurrentMonth() {
    if (disableNext) return;

    setTranslateAmount(-378);
    setTimeout(() => {
      increaseFocusDate();
      setTranslateAmount(0);
    }, 200);
  }

  function decreaseCurrentMonth() {
    if (disablePrev) return;

    setTranslateAmount(378);
    setTimeout(() => {
      decreaseFocusDate();
      setTranslateAmount(0);
    }, 200);
  }

  function onBackButtonKeyDown(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      e.preventDefault();
      decreaseCurrentMonth();

      return false;
    }
  }

  function onNextButtonKeyDown(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      e.preventDefault();
      increaseCurrentMonth();

      return false;
    }
  }

  function focusOnCalendar() {
    if (containerRef && containerRef.current) {
      let selectedButton = containerRef.current.querySelector('.day.selected');
      if (!selectedButton) {
        selectedButton = containerRef.current.querySelector(
          '.month-calendar:not(.hidden) .day:not(.disabled)',
        );
      }
      if (selectedButton) {
        selectedButton.focus();
      }
    }
  }

  function onKeyDown(e) {
    const allowKeyCodes = [9, 32, 37, 38, 39, 40];
    if (
      allowKeyCodes.indexOf(e.keyCode) === -1
      || !e.target.getAttribute('data-day-index')
    ) {
      return true;
    }

    e.preventDefault();

    const calendarContainer = e.target.parentElement.parentElement.parentElement.parentElement;
    const dayIndex = parseInt(e.target.getAttribute('data-day-index'));
    const dateValue = parseInt(e.target.getAttribute('data-date-value'));
    const date = new Date(dateValue);
    const lastDateOfMonth = getLastDateOfMonth(date);
    let nextDayIndex = -1;
    let increaseAmount = 0;

    if (e.keyCode === 37) {
      increaseAmount = -1;
    } else if (e.keyCode === 39) {
      increaseAmount = 1;
    } else if (e.keyCode === 38) {
      increaseAmount = -7;
    } else if (e.keyCode === 40) {
      increaseAmount = 7;
    } else if (e.keyCode === 32) {
      // Space button
      e.target.click();
    } else if (e.keyCode === 9) {
      // Tab button
      const doneButton = calendarContainer.parentElement.parentElement.parentElement.querySelector(
        '.submit-button',
      );
      if (doneButton) {
        doneButton.focus();

        return true;
      }
    }

    nextDayIndex = dayIndex + increaseAmount;
    if (nextDayIndex > 0 && nextDayIndex <= lastDateOfMonth) {
      const selector = `.day[data-day-index="${nextDayIndex}"]`;
      const dayElement = e.target.parentElement.parentElement.querySelector(
        selector,
      );
      if (dayElement) {
        dayElement.focus();
      }
    } else {
      const nextDate = addDays(date, increaseAmount);
      if (
        increaseAmount > 0
        && monthDiff(focusDate, nextDate) > 1
      ) {
        increaseCurrentMonth();
      } else if (
        increaseAmount < 0
        && monthDiff(nextDate, focusDate) > 0
      ) {
        decreaseCurrentMonth();
      }
      setTimeout(() => {
        const query = `.month-calendar[data-month-index="${nextDate.getMonth()
          + 1}"] .day[data-day-index="${nextDate.getDate()}"]`;
        const dayElement = calendarContainer.querySelector(query);
        if (dayElement) {
          dayElement.focus();
        }
      }, 200);
    }

    return false;
  }

  function renderMonthCalendars() {
    return monthArray.map((date, dateIndex) => (
      <MonthCalendar
        // eslint-disable-next-line react/no-array-index-key
        key={dateIndex}
        hidden={dateIndex === 0 && translateAmount <= 0}
        isAnimating={dateIndex === 0 && translateAmount > 0}
        month={date.getMonth()}
        year={date.getFullYear()}
        onSelectDate={onSelectDate}
        onHoverDate={onHoverDate}
        fromDate={fromDate}
        toDate={toDate}
        hoverDate={hoverDate}
        startWeekDay={startWeekDay}
        minDate={minDate}
        maxDate={maxDate}
        monthFormat={monthFormat}
        isSingle={isSingle}
      />
    ));
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="calendar-wrapper" ref={containerRef} onKeyDown={onKeyDown}>
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
        <div
          className={cx('flipper-button', { disabled: disablePrev })}
          onClick={decreaseCurrentMonth}
          onKeyDown={onBackButtonKeyDown}
          role="button"
          tabIndex="0"
        >
          <PrevIcon viewBox="0 0 24 24" />
        </div>
        <div
          className={cx('flipper-button', { disabled: disableNext })}
          onClick={increaseCurrentMonth}
          onKeyDown={onNextButtonKeyDown}
          role="button"
          tabIndex="0"
          onBlur={focusOnCalendar}
        >
          <NextIcon viewBox="0 0 24 24" />
        </div>
      </div>
    </div>
  );
};

DialogContentDesktop.propTypes = {
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  hoverDate: PropTypes.instanceOf(Date),
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  startWeekDay: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  monthFormat: PropTypes.string,
  isSingle: PropTypes.bool,
  isOpen: PropTypes.bool,
};

DialogContentDesktop.defaultProps = {
  fromDate: null,
  toDate: null,
  hoverDate: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
  startWeekDay: null,
  minDate: null,
  maxDate: null,
  monthFormat: '',
  isSingle: false,
  isOpen: false,
};

export default DialogContentDesktop;
