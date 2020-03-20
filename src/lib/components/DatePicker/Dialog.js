import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BackIcon from '../../assets/svg/back.svg';
import DateInputGroup from './DateInputGroup';
import DialogContentMobile from './DialogContentMobile';
import DialogContentDesktop from './DialogContentDesktop';

const Dialog = ({
  toggleDialog,
  isOpen,
  fromDate,
  toDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
  handleReset,
  handleClickDateInput,
  inputFocus,
  handleChangeDate,
  startDatePlaceholder,
  endDatePlaceholder,
  startWeekDay,
  minDate,
  maxDate,
  dateFormat,
  monthFormat,
  isSingle,
  isMobile,
}) => {
  const containerRef = useRef();
  const [hideAnimation, setHideAnimation] = useState(false);
  const [dateChanged, setDateChanged] = useState();

  function onChangeDate(date, value) {
    setDateChanged(date);
    handleChangeDate(date, value);
  }

  useEffect(() => {
    if (isOpen && !hideAnimation) {
      setHideAnimation(true);
    }
    if (isOpen) {
      setTimeout(() => {
        const startDateInput = containerRef.current.querySelector('#start-date-input-button');
        if (startDateInput) {
          startDateInput.focus();
        }
      }, 50);
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={cx('dialog-date-picker', {
        open: isOpen,
        hide: !isOpen && hideAnimation,
      })}
    >
      <div className="dialog-header">
        <button
          type="button"
          className="btn-outline back-button"
          onClick={toggleDialog}
        >
          <BackIcon viewBox="0 0 492 492" />
        </button>
        <DateInputGroup
          inputFocus={inputFocus}
          handleClickDateInput={handleClickDateInput}
          fromDate={fromDate}
          toDate={toDate}
          minDate={minDate}
          maxDate={maxDate}
          handleChangeDate={onChangeDate}
          startDatePlaceholder={startDatePlaceholder}
          endDatePlaceholder={endDatePlaceholder}
          dateFormat={dateFormat}
          isSingle={isSingle}
          nonFocusable={!isOpen}
        />
        <button
          type="button"
          className="btn-outline reset-button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="dialog-content">
        {isMobile
          ? (
            <DialogContentMobile
              fromDate={fromDate}
              toDate={toDate}
              hoverDate={hoverDate}
              onSelectDate={onSelectDate}
              startWeekDay={startWeekDay}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat={dateFormat}
              monthFormat={monthFormat}
              isOpen={isOpen}
              isSingle={isSingle}
            />
          )
          : (
            <DialogContentDesktop
              fromDate={fromDate}
              toDate={toDate}
              hoverDate={hoverDate}
              onSelectDate={onSelectDate}
              onHoverDate={onHoverDate}
              startWeekDay={startWeekDay}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat={dateFormat}
              monthFormat={monthFormat}
              isSingle={isSingle}
              isOpen={isOpen}
              dateChanged={dateChanged}
            />
          )}
      </div>
      <div className="dialog-footer">
        <button type="button" className="submit-button" onClick={toggleDialog} tabIndex="0">
          Done
        </button>
        <button
          type="button"
          className="btn-outline reset-button mobile"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  inputFocus: PropTypes.string,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  hoverDate: PropTypes.instanceOf(Date),
  toggleDialog: PropTypes.func,
  handleClickDateInput: PropTypes.func,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  handleReset: PropTypes.func,
  handleChangeDate: PropTypes.func,
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  startWeekDay: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  isSingle: PropTypes.bool,
  isMobile: PropTypes.bool,
};

Dialog.defaultProps = {
  isOpen: false,
  inputFocus: null,
  fromDate: null,
  toDate: null,
  hoverDate: null,
  toggleDialog: () => {},
  handleClickDateInput: () => {},
  onSelectDate: () => {},
  onHoverDate: () => {},
  handleReset: () => {},
  handleChangeDate: () => {},
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  startWeekDay: null,
  minDate: null,
  maxDate: null,
  dateFormat: '',
  monthFormat: '',
  isSingle: false,
  isMobile: false,
};

export default Dialog;
