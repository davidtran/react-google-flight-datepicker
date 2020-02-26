import React, {
  useState, useRef, useEffect,
} from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import CalendarIcon from '../../assets/svg/calendar.svg'
import PrevIcon from '../../assets/svg/prev.svg'
import NextIcon from '../../assets/svg/next.svg'
import BackIcon from '../../assets/svg/back.png'

const DatePicker = ({
  onClick,
  disabled,
  className,
  text,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hideAnimation, setHideAnimation] = useState(false)
  const containerRef = useRef(null)
  const dialogRef = useRef(null)

  function handleDocumentClick(e) {
    if (containerRef.current && containerRef.current.contains(e.target) === false) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)

    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  function toggleDialog() {
    const nextIsOpen = !isOpen
    setIsOpen(nextIsOpen)
    if (nextIsOpen === true && !hideAnimation) {
      setHideAnimation(true)
    }
  }

  return (
    <div className="date-picker" ref={containerRef}>
      <CalendarIcon className="icon-calendar mobile" viewBox="0 0 24 24" />
      <div
        className="date"
        role="button"
        tabIndex="-1"
        onClick={toggleDialog}
        onKeyDown={toggleDialog}
      >
        <CalendarIcon className="icon-calendar" viewBox="0 0 24 24" />
        <div className="selected-date">Fri, 21 Feb</div>
        <div className="change-date-group">
          <button type="button" className="btn-outline change-date-button">
            <PrevIcon viewBox="0 0 24 24" className="icon-arrow" />
          </button>
          <button type="button" className="btn-outline change-date-button">
            <NextIcon viewBox="0 0 24 24" className="icon-arrow" />
          </button>
        </div>
      </div>
      <div className="divider" />
      <div
        className="date end-date"
        role="button"
        tabIndex="0"
        onClick={toggleDialog}
        onKeyDown={toggleDialog}
      >
        <div className="selected-date">Mon, 24 Feb</div>
        <div className="change-date-group">
          <button type="button" className="btn-outline change-date-button">
            <PrevIcon viewBox="0 0 24 24" className="icon-arrow" />
          </button>
          <button type="button" className="btn-outline change-date-button">
            <NextIcon viewBox="0 0 24 24" className="icon-arrow" />
          </button>
        </div>
      </div>
      <div className={`dialog-date-picker ${isOpen ? 'open' : hideAnimation ? 'hide' : ''}`} ref={dialogRef}>
        <div className="dialog-header">
          <button type="button" className="btn-outline back-button" onClick={toggleDialog}>
            <img src={BackIcon} alt="back-icon" className="back-icon" />
          </button>
          <div className="date-picker">
            <CalendarIcon className="icon-calendar-mobile" viewBox="0 0 24 24" />
            <div
              className="date is-focus"
              role="button"
              tabIndex="-1"
            >
              <CalendarIcon className="icon-calendar" viewBox="0 0 24 24" />
              <div className="selected-date">Fri, 21 Feb</div>
              <div className="change-date-group">
                <button type="button" className="btn-outline change-date-button">
                  <PrevIcon viewBox="0 0 24 24" className="icon-arrow" />
                </button>
                <button type="button" className="btn-outline change-date-button">
                  <NextIcon viewBox="0 0 24 24" className="icon-arrow" />
                </button>
              </div>
            </div>
            <div className="divider" />
            <div className="date end-date" role="button" tabIndex="0">
              <div className="selected-date">Mon, 24 Feb</div>
              <div className="change-date-group">
                <button type="button" className="btn-outline change-date-button">
                  <PrevIcon viewBox="0 0 24 24" className="icon-arrow" />
                </button>
                <button type="button" className="btn-outline change-date-button">
                  <NextIcon viewBox="0 0 24 24" className="icon-arrow" />
                </button>
              </div>
            </div>
          </div>
          <button type="button" className="btn-outline reset-button">Reset</button>
        </div>
        <div className="dialog-content">
          <div className="calendar-wrapper">
            <div className="calendar-content">
              <div className="calendar">
                <div className="calendar-header first">February</div>
                <div className="weekdays first">
                  <div className="weekday">M</div>
                  <div className="weekday">T</div>
                  <div className="weekday">W</div>
                  <div className="weekday">T</div>
                  <div className="weekday">F</div>
                  <div className="weekday">S</div>
                  <div className="weekday">S</div>
                </div>
                <div className="week">
                  <div className="day">
                    <div className="text-day">1</div>
                  </div>
                  <div className="day">
                    <div className="text-day">2</div>
                  </div>
                  <div className="day">
                    <div className="text-day">3</div>
                  </div>
                  <div className="day">
                    <div className="text-day">4</div>
                  </div>
                  <div className="day">
                    <div className="text-day">5</div>
                  </div>
                  <div className="day">
                    <div className="text-day">6</div>
                  </div>
                  <div className="day">
                    <div className="text-day">7</div>
                  </div>
                </div>
                <div className="week">
                  <div className="day">
                    <div className="text-day">8</div>
                  </div>
                  <div className="day">
                    <div className="text-day">9</div>
                  </div>
                  <div className="day">
                    <div className="text-day">10</div>
                  </div>
                  <div className="day">
                    <div className="text-day">11</div>
                  </div>
                  <div className="day">
                    <div className="text-day">12</div>
                  </div>
                  <div className="day">
                    <div className="text-day">13</div>
                  </div>
                  <div className="day">
                    <div className="text-day">14</div>
                  </div>
                </div>
                <div className="week">
                  <div className="day">
                    <div className="text-day">1</div>
                  </div>
                  <div className="day">
                    <div className="text-day">2</div>
                  </div>
                  <div className="day">
                    <div className="text-day">3</div>
                  </div>
                  <div className="day">
                    <div className="text-day">4</div>
                  </div>
                  <div className="day">
                    <div className="text-day">5</div>
                  </div>
                  <div className="day">
                    <div className="text-day">6</div>
                  </div>
                  <div className="day">
                    <div className="text-day">7</div>
                  </div>
                </div>
                <div className="week">
                  <div className="day">
                    <div className="text-day">8</div>
                  </div>
                  <div className="day">
                    <div className="text-day">9</div>
                  </div>
                  <div className="day">
                    <div className="text-day">10</div>
                  </div>
                  <div className="day">
                    <div className="text-day">11</div>
                  </div>
                  <div className="day">
                    <div className="text-day">12</div>
                  </div>
                  <div className="day">
                    <div className="text-day">13</div>
                  </div>
                  <div className="day">
                    <div className="text-day">14</div>
                  </div>
                </div>
              </div>
              <div className="calendar">
                <div className="calendar-header">February</div>
                <div className="weekdays">
                  <div className="weekday">M</div>
                  <div className="weekday">T</div>
                  <div className="weekday">W</div>
                  <div className="weekday">T</div>
                  <div className="weekday">F</div>
                  <div className="weekday">S</div>
                  <div className="weekday">S</div>
                </div>
                <div className="week">
                  <div className="day">
                    <div className="text-day">1</div>
                  </div>
                  <div className="day">
                    <div className="text-day">2</div>
                  </div>
                  <div className="day">
                    <div className="text-day">3</div>
                  </div>
                  <div className="day">
                    <div className="text-day">4</div>
                  </div>
                  <div className="day">
                    <div className="text-day">5</div>
                  </div>
                  <div className="day">
                    <div className="text-day">6</div>
                  </div>
                  <div className="day">
                    <div className="text-day">7</div>
                  </div>
                </div>
                <div className="week">
                  <div className="day">
                    <div className="text-day">8</div>
                  </div>
                  <div className="day selected">
                    <div className="text-day">9</div>
                  </div>
                  <div className="day">
                    <div className="text-day">10</div>
                  </div>
                  <div className="day">
                    <div className="text-day">11</div>
                  </div>
                  <div className="day">
                    <div className="text-day">12</div>
                  </div>
                  <div className="day">
                    <div className="text-day">13</div>
                  </div>
                  <div className="day">
                    <div className="text-day">14</div>
                  </div>
                </div>
                <div className="week">
                  <div className="day">
                    <div className="text-day">1</div>
                  </div>
                  <div className="day">
                    <div className="text-day">2</div>
                  </div>
                  <div className="day">
                    <div className="text-day">3</div>
                  </div>
                  <div className="day">
                    <div className="text-day">4</div>
                  </div>
                  <div className="day">
                    <div className="text-day">5</div>
                  </div>
                  <div className="day">
                    <div className="text-day">6</div>
                  </div>
                  <div className="day">
                    <div className="text-day">7</div>
                  </div>
                </div>
                <div className="week">
                  <div className="day">
                    <div className="text-day">8</div>
                  </div>
                  <div className="day">
                    <div className="text-day">9</div>
                  </div>
                  <div className="day">
                    <div className="text-day">10</div>
                  </div>
                  <div className="day">
                    <div className="text-day">11</div>
                  </div>
                  <div className="day">
                    <div className="text-day">12</div>
                  </div>
                  <div className="day">
                    <div className="text-day">13</div>
                  </div>
                  <div className="day">
                    <div className="text-day">14</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="calendar-flippers">
            <div className="flipper-button">
              <PrevIcon viewBox="0 0 24 24" />
            </div>
            <div className="flipper-button">
              <NextIcon viewBox="0 0 24 24" />
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
