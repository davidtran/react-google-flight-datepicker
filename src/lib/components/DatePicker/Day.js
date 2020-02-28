import React from 'react'
import PropTypes from 'prop-types'

const Day = ({ day, selected }) => (
  <div className={`day ${selected ? 'selected' : ''}`}>
    <div className="text-day">{day}</div>
  </div>
)

Day.propTypes = {
  day: PropTypes.number,
  selected: PropTypes.bool,
}

Day.defaultProps = {
  day: 1,
  selected: false,
}

export default Day
