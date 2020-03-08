import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import PrevIcon from '../../assets/svg/prev.svg';
import NextIcon from '../../assets/svg/next.svg';

import MonthCalendar from './MonthCalendar';
import { resetTimeDate } from '../../helpers';

const DialogContentDesktop = ({
  fromDate,
  toDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
  startWeekDay,
  minDate,
  maxDate,
}) => {
  const [translateAmount, setTranslateAmount] = useState(0);
  const [monthArray, setMonthArray] = useState([]);
  const [focusDate, setFocusDate] = useState(new Date());
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  function getArrayMonth(date) {
    const prevMonth = new Date(new Date(date).setMonth(new Date(date).getMonth() - 1));
    const nextMonth = new Date(new Date(date).setMonth(new Date(date).getMonth() + 1));
    const futureMonth = new Date(new Date(date).setMonth(new Date(date).getMonth() + 2));

    return [prevMonth, focusDate, nextMonth, futureMonth];
  }

  useEffect(() => {
    let date = fromDate ? new Date(fromDate) : new Date();
    date = resetTimeDate(date);
    date.setDate(1);
    setFocusDate(date);
  }, [fromDate]);

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
      const nextDate = resetTimeDate((new Date(focusDate).setMonth(new Date(focusDate).getMonth() + 1)));
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
    const nextFocusDate = new Date(focusDate.setMonth(focusDate.getMonth() - 1));
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

  function renderMonthCalendars() {
    return monthArray.map((date, dateIndex) => (
      <MonthCalendar
        // eslint-disable-next-line react/no-array-index-key
        key={dateIndex}
        hidden={dateIndex === 0 && (translateAmount <= 0)}
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
      />
    ));
  }

  return (
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
        <div className={cx('flipper-button', { disabled: disablePrev })} onClick={decreaseCurrentMonth} role="button" tabIndex="-1">
          <PrevIcon viewBox="0 0 24 24" />
        </div>
        <div className={cx('flipper-button', { disabled: disableNext })} onClick={increaseCurrentMonth} role="button" tabIndex="0">
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
};

export default DialogContentDesktop;
