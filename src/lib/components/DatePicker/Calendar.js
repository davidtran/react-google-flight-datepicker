import React from 'react'
import PropTypes from 'prop-types'
import Week from './Week'

const Calendar = ({ isFirst }) => (
  <div className={`calendar ${isFirst ? 'first' : ''}`}>
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
    <Week />
    <Week />
    <Week />
    <Week />
  </div>

)

Calendar.propTypes = {
  isFirst: PropTypes.bool,
}

Calendar.defaultProps = {
  isFirst: false,
}

export default Calendar
