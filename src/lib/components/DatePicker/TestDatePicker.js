import React, { useEffect, useState } from 'react';
import RangeDatePicker from './RangeDatePicker';
import dayjs from 'dayjs';

const TestDatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  setTimeout(() => {
    setStartDate(dayjs().add(3, 'day'));
  }, 5000);
  return (
    <RangeDatePicker
      startDate={startDate}
      onChange={() => {
        console.log('change');
      }}
    />
  );
}

export default TestDatePicker;