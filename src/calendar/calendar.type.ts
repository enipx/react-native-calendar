import type { ButtonProps, FlexProps, TextProps, ViewProps } from '../themed';

type CalendarHighlightType = {
  from: string;
  to: string;
};
export interface CalendarProps extends CalendarDayStylingProps {
  date?: string; // format YYYY-MM-DD
  font?: string;
  onSelectedDay?: (day: Date) => void;
  hideOtherMonthDays?: boolean;
  highlight?: CalendarHighlightType;
  markedDays?: string[];
  nextElement?: JSX.Element;
  previousElement?: JSX.Element;
  nextElementStyle?: ViewProps['style'];
  previousElementStyle?: ViewProps['style'];
}

export type DayStylingType = {
  viewBg: string;
  bg: string;
  color: string;
  activeColor: string;
};

export interface CalendarDayStylingProps {
  activeColor?: string;
  inActiveColor?: string;
  containerStyle?: ViewProps['style'];
  textStyle?: TextProps['style'];
  style?: ButtonProps['style'];
  markSize?: number;
  markStyle?: ViewProps['style'];
  markColor?: string;
  styling?: DayStylingType;
  selectedDayBackgroundColor?: string;
  selectedDayStyle?: ButtonProps['style'];
  selectedDayTextColor?: string;
  highlightBackgroundColor?: string;
  highlightTextColor?: string;
  size?: number;
  todayTextColor?: string;
  todayBackgroundColor?: string;
  todayStyle?: TextProps['style'];
  borderRadius?: number;
}

export interface CalendarDayProps
  extends CalendarProps,
    CalendarDayStylingProps {
  day: Date;
  isToday?: boolean;
  isSelected?: boolean;
  isOtherMonthDay?: boolean;
  isHighlighted?: boolean;
  isHighlightStart?: boolean;
  isHighlightEnd?: boolean;
  isMarked?: boolean;
  hide?: boolean;
}

export interface WeekCalendarProps extends CalendarProps {}

export interface WeekDaysTextProps
  extends CalendarProps,
    Omit<FlexProps, keyof CalendarDayProps> {
  days: any[];
}

export interface CalenderHeaderProps extends CalendarProps {
  onPreviousPress?: () => void;
  onNextPress?: () => void;
  title: string;
}
