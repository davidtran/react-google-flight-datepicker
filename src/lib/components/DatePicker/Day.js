import React from 'react'
import PropTypes from 'prop-types'

const Day = ({
  day, selected, hovered, onSelectDay, onHoverDay, isEndDay,
}) => (
  <div
    className={`day 
      ${selected ? 'selected' : ''} 
      ${hovered ? 'hovered' : ''}
      ${isEndDay ? 'end' : ''}
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
  isEndDay: PropTypes.bool,
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
  onSelectDay: PropTypes.func,
  onHoverDay: PropTypes.func,
}

Day.defaultProps = {
  day: 1,
  isEndDay: false,
  selected: false,
  hovered: false,
  onSelectDay: () => {},
  onHoverDay: () => {},
}

export default Day
