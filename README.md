# react-google-flight-datepicker
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


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
Leo Phan - leophan@jslancer.com

### License
MIT

[package-url]: https://npmjs.org/package/react-google-flight-datepicker
[npm-version-svg]: http://versionbadg.es/jslancerteam/react-google-flight-datepicker.svg
[deps-svg]: https://david-dm.org/jslancerteam/react-google-flight-datepicker.svg
[deps-url]: https://david-dm.org/jslancerteam/react-google-flight-datepicker
[dev-deps-svg]: https://david-dm.org/jslancerteam/react-google-flight-datepicker/dev-status.svg
[dev-deps-url]: https://david-dm.org/jslancerteam/react-google-flight-datepicker#info=devDependencies
[downloads-image]: http://img.shields.io/npm/dm/react-google-flight-datepicker.svg
[downloads-url]: http://npm-stat.com/charts.html?package=react-google-flight-datepicker