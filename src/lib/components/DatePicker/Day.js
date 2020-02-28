import React from 'react'
import PropTypes from 'prop-types'

const Day = ({
  day, selected, hovered, onSelectDay, onHoverDay, endDay,
}) => (
  <div
    className={`day 
      ${selected ? 'selected' : ''} 
      ${hovered ? 'hovered' : ''}
      ${endDay ? 'end' : ''}
    `}
    onClick={() => onSelectDay(day)}
    onMouseEnter={() => onHoverDay(day)}
    role="button"
    tabIndex="0"
  >
    <div className="text-day">{day}</div>
  </div>
)

Day.propTypes = {
  day: PropTypes.number,
  endDay: PropTypes.bool,
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
  onSelectDay: PropTypes.func,
  onHoverDay: PropTypes.func,
}

Day.defaultProps = {
  day: 1,
  endDay: false,
  selected: false,
  hovered: false,
  onSelectDay: () => {},
  onHoverDay: () => {},
}

export default Day
