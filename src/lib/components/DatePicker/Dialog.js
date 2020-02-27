import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import PrevIcon from '../../assets/svg/prev.svg'
import NextIcon from '../../assets/svg/next.svg'
import BackIcon from '../../assets/svg/back.png'
import DateInputGroup from './DateInputGroup'
import Calendar from './Calendar'

const Dialog = ({
  toggleDialog,
  isOpen
}) => {
  const [hideAnimation, setHideAnimation] = useState(false)

  useEffect(() => {
    if (isOpen && !hideAnimation) {
      setHideAnimation(true);
    }
  }, [isOpen]);

  const datePickerClassName = isOpen ? 'open' : hideAnimation ? 'hide' : '';

  return (
    <div className={`dialog-date-picker ${datePickerClassName}`}>
      <div className="dialog-header">
        <button type="button" className="btn-outline back-button" onClick={toggleDialog}>
          <img src={BackIcon} alt="back-icon" className="back-icon" />
        </button>
        <DateInputGroup />
        <button type="button" className="btn-outline reset-button">Reset</button>
      </div>
      <div className="dialog-content">
        <div className="calendar-wrapper">
          <div className="calendar-content">
            <Calendar isFirst />
            <Calendar />
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
