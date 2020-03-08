DatePicker examples:

###### DatePicker

```js
import { DatePicker } from 'react-google-flight-datepicker';

<div className="react-google-flight-datepicker">
  <div className="date-picker-demo">
    <DatePicker 
      // startDatePlaceholder="My from date"
      // onChange={(startDate, endDate) => console.log(startDate, endDate)}
      // onFocus={(inputFocus) => console.log(inputFocus)}
      startDate={new Date('2020-2-25')}
      endDate={new Date('2020-2-27')}
      // startWeekDay="sunday"
      minDate={new Date('2020-2-20')}
      maxDate={new Date('2020-5-20')}
    />
  </div>
</div>
```
