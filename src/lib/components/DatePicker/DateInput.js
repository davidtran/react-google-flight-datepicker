import React from 'react'
import PropTypes from 'prop-types'
import CalendarIcon from '../../assets/svg/calendar.svg'
import PrevIcon from '../../assets/svg/prev.svg'
import NextIcon from '../../assets/svg/next.svg'

const DateInput = ({
  toggleDialog,
  showIcon,
  tabIndex,
  isFocus,
}) => (
  <div
    className={`date ${isFocus ? 'is-focus' : ''}`}
    role="button"
    tabIndex={tabIndex}
    onClick={toggleDialog}
  >
    {showIcon
    && <CalendarIcon className="icon-calendar" viewBox="0 0 24 24" />}
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
)

DateInput.propTypes = {
  toggleDialog: PropTypes.func,
  showIcon: PropTypes.bool,
  tabIndex: PropTypes.string,
  isFocus: PropTypes.bool,
}

DateInput.defaultProps = {
  toggleDialog: () => {},
  showIcon: false,
  tabIndex: '',
  isFocus: false,
}

export default DateInput
