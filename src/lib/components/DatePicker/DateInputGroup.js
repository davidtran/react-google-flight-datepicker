import React from 'react'
import PropTypes from 'prop-types'
import DateInput from './DateInput'
import CalendarIcon from '../../assets/svg/calendar.svg'

const DateInputGroup = ({ toggleDialog, showCalendarIcon }) => (
  <div className="date-picker-input">
    {showCalendarIcon
    && <CalendarIcon className="icon-calendar mobile" viewBox="0 0 24 24" />}
    <DateInput
      toggleDialog={toggleDialog}
      showIcon
      tabIndex="-1"
    />
    <div className="divider" />
    <DateInput
      toggleDialog={toggleDialog}
      className="end-date"
      tabIndex="0"
    />
  </div>
)

DateInputGroup.propTypes = {
  toggleDialog: PropTypes.func,
  showCalendarIcon: PropTypes.bool,
}

DateInputGroup.defaultProps = {
  toggleDialog: () => {},
  showCalendarIcon: false,
}

export default DateInputGroup
