import type { FlexProps } from '../themed';

type CalendarHightlightType = {
  from: string;
  to: string;
};
export interface CalendarProps {
  date?: string; // format YYYY-MM-DD
  font?: string;
  onSelectedDay?: (day: Date) => void;
  hideOtherMonthDays?: boolean;
  highlight?: CalendarHightlightType;
}

export interface WeekCalendarProps extends CalendarProps {}

export interface WeekDaysTextProps extends CalendarProps, FlexProps {
  days: any[];
}

export interface CalenderHeaderProps extends CalendarProps {
  onPreviousPress?: () => void;
  onNextPress?: () => void;
  title: string;
  nextElement?: JSX.Element;
  previousElement?: JSX.Element;
}
