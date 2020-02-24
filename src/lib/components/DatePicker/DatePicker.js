import React, {
  useState, useRef, useEffect,
} from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import CalendarIcon from '../../assets/svg/calendar.svg'
import BackIcon from '../../assets/svg/back.svg'
import NextIcon from '../../assets/svg/next.svg'

const DatePicker = ({
  onClick,
  disabled,
  className,
  text,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (dialogRef.current) {
      setTimeout(() => {
        dialogRef.current.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }, [isOpen])

  function toggleDialog() {
    setIsOpen(!isOpen)
  }

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }

  function generateDay(month) {
    const numberDay = daysInMonth(month, 2020)

    return [...Array(numberDay)].map((val, idx) => (
      <div className="day" key={idx}>
        <div className="text-day">{idx + 1}</div>
      </div>
    ))
  }

  return (
    <div className="date-picker">
      <div
        className="date start-date"
        role="button"
        tabIndex="-1"
        onClick={toggleDialog}
        onKeyDown={toggleDialog}
      >
        <CalendarIcon className="icon-calendar" viewBox="0 0 37 37" />
        <div className="selected-date">Fri, 21 Feb</div>
        <div className="button-group">
          <button type="button" className="btn-outline">
            <BackIcon viewBox="0 0 492 492" className="arrow" />
          </button>
          <button type="button" className="btn-outline">
            <NextIcon viewBox="0 0 492 492" className="arrow" />
          </button>
        </div>
      </div>
      <div className="line-break">
        <div className="line" />
      </div>
      <div className="date end-date" role="button" tabIndex="0">
        <div className="selected-date">Mon, 24 Feb</div>
        <div className="button-group">
          <button type="button" className="btn-outline">
            <BackIcon viewBox="0 0 492 492" className="arrow" />
          </button>
          <button type="button" className="btn-outline">
            <NextIcon viewBox="0 0 492 492" className="arrow" />
          </button>
        </div>
      </div>
      <div className={`dialog-date-picker ${isOpen && 'open'}`} ref={dialogRef}>
        <div className="dialog-header">
          <div className="date-picker">
            <div
              className="date start-date"
              role="button"
              tabIndex="-1"
            >
              <CalendarIcon className="icon-calendar" viewBox="0 0 37 37" />
              <div className="selected-date">Fri, 21 Feb</div>
              <div className="button-group">
                <button type="button" className="btn-outline">
                  <BackIcon viewBox="0 0 492 492" className="arrow" />
                </button>
                <button type="button" className="btn-outline">
                  <NextIcon viewBox="0 0 492 492" className="arrow" />
                </button>
              </div>
            </div>
            <div className="line-break">
              <div className="line" />
            </div>
            <div className="date end-date" role="button" tabIndex="0">
              <div className="selected-date">Mon, 24 Feb</div>
              <div className="button-group">
                <button type="button" className="btn-outline">
                  <BackIcon viewBox="0 0 492 492" className="arrow" />
                </button>
                <button type="button" className="btn-outline">
                  <NextIcon viewBox="0 0 492 492" className="arrow" />
                </button>
              </div>
            </div>
          </div>
          <button type="button" className="btn-outline reset-button">Reset</button>
        </div>
        <div className="dialog-content">
          <div className="calendar">
            <div className="month">
              <div className="header-month">February</div>
              <div className="weekdays">
                <div className="weekday">M</div>
                <div className="weekday">T</div>
                <div className="weekday">W</div>
                <div className="weekday">T</div>
                <div className="weekday">F</div>
                <div className="weekday">S</div>
                <div className="weekday">S</div>
              </div>
              <div className="days">
                {generateDay(2)}
              </div>
            </div>
            <div className="month">
              <div className="header-month">March</div>
              <div className="weekdays">
                <div className="weekday">M</div>
                <div className="weekday">T</div>
                <div className="weekday">W</div>
                <div className="weekday">T</div>
                <div className="weekday">F</div>
                <div className="weekday">S</div>
                <div className="weekday">S</div>
              </div>
              <div className="days">
                {generateDay(3)}
              </div>
            </div>
          </div>
          <div className="change-month-group">
            <div className="change-month-button">
              <BackIcon viewBox="0 0 492 492" />
            </div>
            <div className="change-month-button">
              <NextIcon viewBox="0 0 492 492" />
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          <button type="button" className="submit-button" onClick={toggleDialog}>Done</button>
        </div>
      </div>
    </div>
  )
}

DatePicker.propTypes = {
  onClick: PropTypes.func,
  /** Disable the button */
  disabled: PropTypes.bool,
  className: PropTypes.string,
  /** Text of the button */
  text: PropTypes.string,
}

DatePicker.defaultProps = {
  onClick: () => {},
  disabled: false,
  className: null,
  text: 'Click Me',
}

export default DatePicker
