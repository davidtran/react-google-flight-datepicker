import React, { useEffect, useState } from 'react';
import RangeDatePicker from './RangeDatePicker';
import SingleDatePicker from './SingleDatePicker';
import dayjs from 'dayjs';

const TestDatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <SingleDatePicker
      startDate={startDate}
      endDate={endDate}
      onChange={(date1, date2) => {
        setStartDate(date1);
        setEndDate(date2);
      }}
    />
  );
}

export default TestDatePicker;