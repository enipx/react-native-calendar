import { Dimensions } from 'react-native';

export const AllWeekDaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const AllWeekDaysMid = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const AllWeekDaysFull = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const AllWeekDays = {
  short: AllWeekDaysShort,
  mid: AllWeekDaysMid,
  full: AllWeekDaysFull,
};

export const getDeviceLayout = (divisible = 1) => {
  const { width, height } = Dimensions.get('window');
  return {
    width: width / divisible,
    height: height / divisible,
  };
};

export const splitArrayIntoChunks = (array: any[], chunkSize: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};
