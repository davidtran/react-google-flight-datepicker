import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs';
import cx from 'classnames';
import PrevIcon from '../../assets/svg/prev.svg'
import NextIcon from '../../assets/svg/next.svg'
import BackIcon from '../../assets/svg/back.png'
import DateInputGroup from './DateInputGroup'
import Calendar from './Calendar'

const Dialog = ({
  toggleDialog,
  isOpen,
  focusDate,
  increaseFocusDate,
  decreaseFocusDate
}) => {
  const [hideAnimation, setHideAnimation] = useState(false)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)
  const [inputFocus, setInputFocus] = useState('from')
  const [translateAmount, setTranslateAmount] = useState(0);

  useEffect(() => {
    if (isOpen && !hideAnimation) {
      setHideAnimation(true)
    }
  }, [isOpen])

  const datePickerClassName = isOpen ? 'open' : hideAnimation ? 'hide' : ''

  let fromDay = ''
  if (fromDate) {
    const arrFromDate = fromDate.split('-')
    fromDay = parseInt(arrFromDate[2])
  }

  let toDay = ''
  if (toDate) {
    const arrToDate = toDate.split('-')
    toDay = parseInt(arrToDate[2])
  }

  let hoverDay = ''
  if (hoverDate) {
    const arrHoverDate = hoverDate.split('-')
    hoverDay = parseInt(arrHoverDate[2])
  }

  function onSelectDate(date) {
    if (inputFocus) {
      if (inputFocus === 'from' || (fromDate && new Date(date) < new Date(fromDate))) {
        setFromDate(date)
        setInputFocus('to')
      } else {
        setToDate(date)
        setInputFocus(null)
      }
    } else {
      setFromDate(date)
      setInputFocus('to')
      if (toDate && new Date(date) > new Date(toDate)) {
        setToDate(null)
      }
    }
  }

  function onHoverDate(date) {
    setHoverDate(date)
  }

  function renderCalendars() {
    const prevMonth = dayjs(focusDate).subtract(1, 'month').toDate();
    const nextMonth = dayjs(focusDate).add(1, 'month').toDate();
    const futureMonth = dayjs(focusDate).add(2, 'month').toDate();
    const dateArray = [prevMonth, focusDate, nextMonth, futureMonth];

    return dateArray.map((date, dateIndex) => (
      <Calendar
        isFirst={date === focusDate}
        hidden={dateIndex === 0 && (translateAmount <= 0)}
        isAnimating={dateIndex === 0 && translateAmount > 0}
        month={date.getMonth() + 1}
        year={date.getFullYear()}
        onSelectDate={onSelectDate}
        onHoverDate={onHoverDate}
        fromDay={fromDay}
        toDay={toDay}
        hoverDay={hoverDay}
      />
    ));
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
              isAnimating: translateAmount !== 0
            })}
            style={{
              transform: `translateX(${translateAmount}px)`,
            }}
          >
            {renderCalendars()}
          </div>
        </div>
        <div className="calendar-flippers">
          <div className="flipper-button" onClick={decreaseCurrentMonth}>
            <PrevIcon viewBox="0 0 24 24" />
          </div>
          <div className="flipper-button" onClick={increaseCurrentMonth}>
            <NextIcon viewBox="0 0 24 24" />
          </div>
        </div>
      </div>
      <div className="dialog-footer">
        <button type="button" className="submit-button" onClick={toggleDialog}>Done</button>
      </div>
    </div>
  )
}

Dialog.propTypes = {
  toggleDialog: PropTypes.func,
  isOpen: PropTypes.bool,
}

Dialog.defaultProps = {
  toggleDialog: () => {},
  isOpen: false,
}

export default Dialog
