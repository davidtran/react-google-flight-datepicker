DatePicker examples:

###### SingleDatePicker

```js
import { SingleDatePicker } from 'react-google-flight-datepicker';

<div className="react-google-flight-datepicker">
  <div className="date-picker-demo">
    <SingleDatePicker
      singleCalendar 
      highlightToday
      dateFormat="DD-MM-YYYY" // "DD-MM-YYYY"
      startWeekDay="monday"
      startDate={new Date('2020-04-20')}
      maxDate={new Date('2020-04-20')}
      minDate={new Date('2020-01-20')}
    />
  </div>
</div>
```
