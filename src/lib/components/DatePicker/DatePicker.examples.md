DatePicker examples:

###### DatePicker
```js
import { DatePicker } from 'react-google-flight-datepicker';

<div className="date-picker-demo">
  <DatePicker 
    startDatePlaceholder="My from date"
    // onChange={(startDate, endDate) => console.log(startDate, endDate)}
    onFocus={(inputFocus) => console.log(inputFocus)}
  />
</div>
```
