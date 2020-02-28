import React, { memo } from 'react'
import PropTypes from 'prop-types'
import DateInput from './DateInput'
import CalendarIcon from '../../assets/svg/calendar.svg'

const DateInputGroup = ({ toggleDialog, showCalendarIcon, inputFocus }) => (
  <div className="date-picker-input">
    {showCalendarIcon
    && <CalendarIcon className="icon-calendar mobile" viewBox="0 0 24 24" />}
    <DateInput
      toggleDialog={toggleDialog}
      showIcon
      tabIndex="-1"
      isFocus={inputFocus === 'from'}
    />
    <div className="divider" />
    <DateInput
      toggleDialog={toggleDialog}
      className="end-date"
      tabIndex="0"
      isFocus={inputFocus === 'to'}
    />
  </div>
)

DateInputGroup.propTypes = {
  toggleDialog: PropTypes.func,
  showCalendarIcon: PropTypes.bool,
  inputFocus: PropTypes.string,
}

DateInputGroup.defaultProps = {
  toggleDialog: () => {},
  showCalendarIcon: false,
  inputFocus: null,
}

export default memo(DateInputGroup)
