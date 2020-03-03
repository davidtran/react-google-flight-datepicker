import React, { useEffect, useState } from 'react';
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
  focusDate,
  fromDate,
  toDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
  handleReset,
  increaseFocusDate,
  decreaseFocusDate,
  handleClickDateInput,
  inputFocus,
  handleChangeDate,
}) => {
  const [hideAnimation, setHideAnimation] = useState(false);
  const [translateAmount, setTranslateAmount] = useState(0);

  useEffect(() => {
    if (isOpen && !hideAnimation) {
      setHideAnimation(true);
    }
  }, [isOpen]);

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
    const prevMonth = new Date(new Date(focusDate).setMonth(new Date(focusDate).getMonth() - 1));
    const nextMonth = new Date(new Date(focusDate).setMonth(new Date(focusDate).getMonth() + 1));
    const futureMonth = new Date(new Date(focusDate).setMonth(new Date(focusDate).getMonth() + 2));

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
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  inputFocus: PropTypes.string,
  focusDate: PropTypes.instanceOf(Date),
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  hoverDate: PropTypes.instanceOf(Date),
  toggleDialog: PropTypes.func,
  increaseFocusDate: PropTypes.func,
  decreaseFocusDate: PropTypes.func,
  handleClickDateInput: PropTypes.func,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  handleReset: PropTypes.func,
  handleChangeDate: PropTypes.func,
};

Dialog.defaultProps = {
  isOpen: false,
  inputFocus: null,
  focusDate: null,
  fromDate: null,
  toDate: null,
  hoverDate: null,
  toggleDialog: () => {},
  increaseFocusDate: () => {},
  decreaseFocusDate: () => {},
  handleClickDateInput: () => {},
  onSelectDate: () => {},
  onHoverDate: () => {},
  handleReset: () => {},
  handleChangeDate: () => {},
};

export default Dialog;
