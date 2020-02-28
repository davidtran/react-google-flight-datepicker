import React from 'react'
import PropTypes from 'prop-types'
import Day from './Day'

const Week = ({
  isFirst, week,
}) => {
  function generateDay() {
    return [...Array(week.days).keys()].map(index => (
      <Day key={index} day={index + week.start} />
    ))
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
}

Week.defaultProps = {
  isFirst: false,
  week: {},
}

export default Week
