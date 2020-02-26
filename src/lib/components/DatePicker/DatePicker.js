import React, {
  useState, useRef, useEffect,
} from 'react'
import './styles.scss'
import DateInputGroup from './DateInputGroup'
import Dialog from './Dialog'

const DatePicker = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hideAnimation, setHideAnimation] = useState(false)
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
    const nextIsOpen = !isOpen
    setIsOpen(nextIsOpen)
    if (nextIsOpen === true && !hideAnimation) {
      setHideAnimation(true)
    }
  }

  return (
    <div className="date-picker" ref={containerRef}>
      <DateInputGroup toggleDialog={toggleDialog} />
      <Dialog className={isOpen ? 'open' : hideAnimation ? 'hide' : ''} toggleDialog={toggleDialog} />
    </div>
  )
}

DatePicker.propTypes = {

}

DatePicker.defaultProps = {

}

export default DatePicker
