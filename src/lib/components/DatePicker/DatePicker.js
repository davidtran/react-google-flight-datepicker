import React, {
  useState, useRef, useEffect,
} from 'react'
import './styles.scss'
import DateInputGroup from './DateInputGroup'
import Dialog from './Dialog'

const DatePicker = () => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  function handleDocumentClick(e) {
    if (containerRef.current && containerRef.current.contains(e.target) === false) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)

    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  function toggleDialog() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="date-picker" ref={containerRef}>
      <DateInputGroup toggleDialog={toggleDialog} showCalendarIcon />
      <Dialog isOpen={isOpen} toggleDialog={toggleDialog} />
    </div>
  )
}

DatePicker.propTypes = {

}

DatePicker.defaultProps = {

}

export default DatePicker
