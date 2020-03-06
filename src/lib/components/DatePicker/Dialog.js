import React, { useEffect, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BackIcon from '../../assets/svg/back.png';
import DateInputGroup from './DateInputGroup';
import DialogContentMobile from './DialogContentMobile';
import DialogContentDesktop from './DialogContentDesktop';

const Dialog = ({
  toggleDialog,
  isOpen,
  startDate,
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
}) => {
  const [hideAnimation, setHideAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (window.innerWidth <= 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useLayoutEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && !hideAnimation) {
      setHideAnimation(true);
    }
  }, [isOpen]);

  return (
    <div
      className={cx('dialog-date-picker', {
        open: isOpen,
        hide: !isOpen && hideAnimation,
      })}
    >
      <div className="dialog-header">
        <button type="button" className="btn-outline back-button" onClick={toggleDialog}>
          <img src={BackIcon} alt="back-icon" className="back-icon" />
        </button>
        <DateInputGroup
          inputFocus={inputFocus}
          handleClickDateInput={handleClickDateInput}
          fromDate={fromDate}
          toDate={toDate}
          handleChangeDate={handleChangeDate}
          startDatePlaceholder={startDatePlaceholder}
          endDatePlaceholder={endDatePlaceholder}
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
              onHoverDate={onHoverDate}
            />
          )
          : (
            <DialogContentDesktop
              startDate={startDate}
              fromDate={fromDate}
              toDate={toDate}
              hoverDate={hoverDate}
              onSelectDate={onSelectDate}
              onHoverDate={onHoverDate}
            />
          )}
      </div>
      <div className="dialog-footer">
        <button type="button" className="submit-button" onClick={toggleDialog}>Done</button>
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
  startDate: PropTypes.instanceOf(Date),
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
};

Dialog.defaultProps = {
  isOpen: false,
  inputFocus: null,
  startDate: null,
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
};

export default Dialog;
