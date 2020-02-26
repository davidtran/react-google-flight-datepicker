import React from 'react'
import PropTypes from 'prop-types'
import DateInput from './DateInput'
import CalendarIcon from '../../assets/svg/calendar.svg'

const DateInputGroup = ({ toggleDialog, isDialog }) => (
  <div className="date-picker-input">
    {!isDialog
    && <CalendarIcon className="icon-calendar mobile" viewBox="0 0 24 24" />}
    <DateInput
      toggleDialog={toggleDialog}
      tabIndex="-1"
      hasIcon
    />
    <div className="divider" />
    <DateInput
      toggleDialog={toggleDialog}
      tabIndex="-1"
      className="end-date"
    />
  </div>
)

DateInputGroup.propTypes = {
  toggleDialog: PropTypes.func,
  isDialog: PropTypes.bool,
}

DateInputGroup.defaultProps = {
  toggleDialog: () => {},
  isDialog: false,
}

export default DateInputGroup
