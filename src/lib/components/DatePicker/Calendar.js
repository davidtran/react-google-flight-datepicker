import React from 'react'
import PropTypes from 'prop-types'
import Week from './Week'
import { getWeeksInMonth, months } from '../../helpers'

const Calendar = ({ isFirst, month, year }) => {
  function generateWeek() {
    const weeks = getWeeksInMonth(year, month, 'monday')

    return weeks.map((week, index) => (
      <Week
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        week={week}
        isFirst={index === 0}
      />
    ))
  }

  return (
    <div className={`calendar ${isFirst ? 'first' : ''}`}>
      <div className="calendar-header">{months[month - 1]}</div>
      <div className="weekdays">
        <div className="weekday">M</div>
        <div className="weekday">T</div>
        <div className="weekday">W</div>
        <div className="weekday">T</div>
        <div className="weekday">F</div>
        <div className="weekday">S</div>
        <div className="weekday">S</div>
      </div>
      {generateWeek()}
    </div>
  )
}

Calendar.propTypes = {
  isFirst: PropTypes.bool,
  month: PropTypes.number,
  year: PropTypes.number,
}

Calendar.defaultProps = {
  isFirst: false,
  month: 0,
  year: 1900,
}

export default Calendar
