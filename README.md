# React Native Calendar

Simple React Native calendar with full customizable support that works really well on both iOS and Android⚡

Please note that this library was created for a personal use cases, but it suits basic needs.

If there is a particular feature you'd like to see in this library, please create a request for this.

Thanks for using.

<br />
<img
  height="700"
  src="https://res.cloudinary.com/dmsic9qmj/image/upload/v1700047611/misc/calendar_ksbokl.png"
/>
<br />

## Installation

Install dependencies:

```sh
$ yarn add @enipx/react-native-calendar

# or

$ npm i @enipx/react-native-calendar
```

## Usage

```jsx
import { Calendar, WeekCalendar } from '@enipx/react-native-calendar';

export default function App() {
  return (
    <View>
      <Calendar
        onSelectedDay={(day) => console.log(day)}
        highlight={{ from: '2023-11-13', to: '2023-11-18' }}
        markedDays={['2023-11-01', '2023-11-18', '2023-11-20']}
      />

      <WeekCalendar
        onSelectedDay={(day) => console.log(day)}
        highlight={{ from: '2023-11-14', to: '2023-11-18' }}
      />
    </View>
  );
}
```

## Props

| Property                   | Type                     | Description                                 |
| -------------------------- | ------------------------ | ------------------------------------------- |
| date                       | `string`                 | default date: format is YYYY-MM-DD          |
| onSelectedDay              | `(date: Date) => void`   | callback method when an date is selected    |
| font                       | `string`                 | change component font                       |
| hideOtherMonthDays         | `boolean`                | hide other month days                       |
| highlight                  | `CalendarHightlightType` | specify range of date to highlight          |
| markedDays                 | `string[]`               | specify dates to mark                       |
| activeColor                | `string`                 | active color: default is #8A72FB            |
| inActiveColor              | `string`                 | in active color: default is rgba(0,0,0,0.3) |
| size                       | `number`                 | update day button size                      |
| borderRadius               | `number`                 | update day border radius                    |
| textStyle                  | `StyleProp<TextStyle>`   | update text style                           |
| style                      | `StyleProp<ButtonStyle>` | update button style                         |
| markSize                   | `number`                 | update mark size                            |
| markColor                  | `number`                 | update mark color                           |
| markStyle                  | `StyleProps<ViewStyle>`  | update mark style                           |
| selectedDayBackgroundColor | `string`                 | update selected day background color        |
| selectedDayTextColor       | `string`                 | update selected day text color              |
| selectedDayStyle           | `StyleProps<ViewStyle>`  | update selected day button style            |
| highlightBackgroundColor   | `string`                 | update highlight day background color       |
| highlightTextColor         | `string`                 | update highlight day text color             |
| todayBackgroundColor       | `string`                 | update today background color               |
| todayTextColor             | `string`                 | update today text color                     |
| todayStyle                 | `StyleProps<ViewStyle>`  | update today button style                   |
| nextElement                | `JSX.Element`            | update next button element                  |
| previousElement            | `JSX.Element`            | update previous button element              |
| nextElementStyle           | `StyleProps<ViewStyle>`  | update next button style                    |
| previousElementStyle       | `StyleProps<ViewStyle>`  | update previous button style                |

## License

MIT ©
