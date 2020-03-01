# react-google-flight-datepicker <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

A responsive and mobile friendly datepicker implemented by ReactJS.

### Demo
To run demo:
- Clone this repository
- `yarn install`
- `yarn run dev`

### Usage

#### DateRangeInput
```jsx
import { DateRangePicker } from 'react-google-flight-datepicker`;

<DateRangePicker
  startDate={this.state.startDate}
  startDateInputId="my-start-date-input-id"
  endDate={this.state.endDate}
  endDateInputId="my-end-date-input-id"
  onFocus={this.onFocus}
  onDateChange={{startDate, endDate} => this.onDateChange(startDate, endDate)}
/>
```
##### Props
|Prop name|Prop type|Default value|Description|
|---------|---------|-------------|-----------|
|startDate|Date     |Current date |Selected start date|
|startDateInputId|String|null|Html ID for start date text input|
|endDate  |Date     |null         |Selected end date|
|endDateInputId|String|null|Html ID for end date text input|
|onFocus|Function|null|Event handler when an input get focus event|
|onDateChange|Function|null|Event handler when user select a date from calendar|

### Author
David Tran - david@jslancer.com
Leo Phan - leop@jslancer.com

### License
MIT
