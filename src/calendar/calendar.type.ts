import type { ButtonProps, FlexProps, TextProps, ViewProps } from '../themed';

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
  markedDays?: string[];
}

export type DayStylingType = {
  viewBg: string;
  bg: string;
  color: string;
  activeColor: string;
};

export interface CalendarDayProps extends CalendarProps {
  day: Date;
  size?: number;
  isToday?: boolean;
  isSelected?: boolean;
  isOtherMonthDay?: boolean;
  isHighlighted?: boolean;
  isHighlightStart?: boolean;
  isHighlightEnd?: boolean;
  isMarked?: boolean;
  markSize?: number;
  markStyle?: ViewProps;
  markColor?: string;
  styling?: DayStylingType;
  hide?: boolean;
  contentStyle?: ViewProps;
  textStyle?: TextProps;
  style?: ButtonProps;
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
