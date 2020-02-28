import React from 'react'
import PropTypes from 'prop-types'
import Day from './Day'

const Week = ({
  isFirst, week, fromDay, toDay, onSelectDay, onHoverDay, hoverDay,
}) => {
  function generateDay() {
    return [...Array(week.days).keys()].map(index => {
      const dayIndex = index + week.start

      return (
        <Day
          key={index}
          day={dayIndex}
          selected={dayIndex === fromDay || dayIndex === toDay}
          hovered={(fromDay && !toDay && dayIndex >= fromDay && dayIndex <= hoverDay)
            || (fromDay && toDay && fromDay <= dayIndex && toDay >= dayIndex)}
          onSelectDay={onSelectDay}
          onHoverDay={onHoverDay}
          endDay={dayIndex === toDay || dayIndex === hoverDay}
        />
      )
    })
  }

  return (
    <div className={`week ${isFirst ? 'first' : ''}`}>
      {generateDay()}
    </div>
  )
}

Week.propTypes = {
  isFirst: PropTypes.bool,
  week: PropTypes.object,
  fromDay: PropTypes.number,
  toDay: PropTypes.number,
  hoverDay: PropTypes.number,
  onSelectDay: PropTypes.func,
  onHoverDay: PropTypes.func,
}

Week.defaultProps = {
  isFirst: false,
  week: {},
  fromDay: null,
  toDay: null,
  hoverDay: null,
  onSelectDay: () => {},
  onHoverDay: () => {},
}

export default Week
