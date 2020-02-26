import React from 'react'
import PropTypes from 'prop-types'
import CalendarIcon from '../../assets/svg/calendar.svg'
import PrevIcon from '../../assets/svg/prev.svg'
import NextIcon from '../../assets/svg/next.svg'

const DateInput = ({
  className,
  toggleDialog,
  hasIcon,
  tabIndex,
}) => (
  <div
    className={`date ${className}`}
    role="button"
    tabIndex={tabIndex}
    onClick={toggleDialog}
    onKeyDown={toggleDialog}
  >
    {hasIcon
    && <CalendarIcon className="icon-calendar" viewBox="0 0 24 24" />}
    <div className="selected-date">Fri, 21 Feb</div>
    <div className="change-date-group">
      <button type="button" className="btn-outline change-date-button">
        <PrevIcon viewBox="0 0 24 24" className="icon-arrow" />
      </button>
      <button type="button" className="btn-outline change-date-button">
        <NextIcon viewBox="0 0 24 24" className="icon-arrow" />
      </button>
    </div>
  </div>
)

DateInput.propTypes = {
  className: PropTypes.string,
  toggleDialog: PropTypes.func,
  hasIcon: PropTypes.bool,
  tabIndex: PropTypes.string,
}

DateInput.defaultProps = {
  className: '',
  toggleDialog: () => {},
  hasIcon: false,
  tabIndex: '',
}

export default DateInput
