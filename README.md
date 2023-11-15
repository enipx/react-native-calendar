# react-native-calendar

Easy-to-use React Native calendar for iOS and Android

## Installation

```sh
npm install react-native-calendar
```

## Usage

```jsx
import { Calendar, WeekCalendar } from 'react-native-calendar';

// ...

<Calendar
  onSelectedDay={(day) => console.log(day)}
  highlight={{ from: '2023-11-13', to: '2023-11-18' }}
  markedDays={['2023-11-01', '2023-11-18', '2023-11-20']}
/>

<WeekCalendar
  onSelectedDay={(day) => console.log(day)}
  highlight={{ from: '2023-11-14', to: '2023-11-18' }}
/>
```

## Props

Here is the available props

## License

MIT
