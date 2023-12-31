import {
  startOfToday,
  format,
  parse,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  addMonths,
  subMonths,
  isToday,
  isSameDay,
  isSameMonth,
  isWithinInterval,
} from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CalendarProps, DayStylingType } from '../calendar/calendar.type';
import { splitArrayIntoChunks } from '../helper/base';

export const useCalendar = (options: CalendarProps) => {
  const { date: optionsDate, hideOtherMonthDays, highlight } = options;

  const today = startOfToday();

  const date = optionsDate
    ? parse(optionsDate, 'yyyy-MM-dd', new Date())
    : today;

  // current selected day - default is today
  const [selectedDay, setSelectedDay] = useState(date);

  // selected month - default is current month
  const [selectedMonth, setSelectedMonth] = useState(format(date, 'MMM-yyyy'));

  // first day of the selected month
  const firstDayOfSelectedMonth = parse(selectedMonth, 'MMM-yyyy', new Date());

  // all days of the selected month
  const allSelectedMonthDays = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(firstDayOfSelectedMonth),
      end: endOfWeek(endOfMonth(firstDayOfSelectedMonth)),
    });
  }, [firstDayOfSelectedMonth]);

  // go to next month
  const gotoNextMonth = useCallback(() => {
    const firstDayOfNextMonth = addMonths(firstDayOfSelectedMonth, 1);

    setSelectedMonth(format(firstDayOfNextMonth, 'MMM-yyyy'));
  }, [firstDayOfSelectedMonth]);

  // go to previous month
  const gotoPreviousMonth = useCallback(() => {
    const firstDayOfPreviousMonth = subMonths(firstDayOfSelectedMonth, 1);

    setSelectedMonth(format(firstDayOfPreviousMonth, 'MMM-yyyy'));
  }, [firstDayOfSelectedMonth]);

  // update selected day
  const updateSelectedDay = (day: Date) => {
    setSelectedDay(day);
    options?.onSelectedDay?.(day);
  };

  const getDayStyle: (day: Date) => DayStylingType = (day) => {
    const {
      selectedDayBackgroundColor,
      selectedDayTextColor,
      activeColor,
      inActiveColor,
      highlightBackgroundColor,
      highlightTextColor,
      todayBackgroundColor,
      todayTextColor,
      textColor,
    } = options;

    const styles = {
      activeColor: activeColor || '#8A72FB',
      inactiveColor: inActiveColor || 'rgba(0,0,0,0.3)',
      transparent: 'transparent',
      fadedColor: highlightBackgroundColor || '#F2F4F7',
      white: '#fff',
      black: '#000',
    };

    const todayBg = todayBackgroundColor || styles.transparent;

    const todayColor = todayTextColor || styles.activeColor;

    switch (true) {
      case isDaySelected(day):
        return {
          viewBg: isDayHighlighted(day).isBetween
            ? styles.fadedColor
            : styles.transparent,
          bg: selectedDayBackgroundColor || styles.activeColor,
          color: selectedDayTextColor || styles.white,
          activeColor: styles.activeColor,
        };
      case isDayHighlighted(day).isBetween:
        return {
          viewBg: styles.fadedColor,
          bg: isToday(day) ? todayBg : styles.fadedColor,
          color: isToday(day) ? todayColor : highlightTextColor || styles.black,
          activeColor: styles.activeColor,
        };
      case isToday(day):
        return {
          viewBg: styles.transparent,
          bg: todayBg,
          color: todayColor,
          activeColor: styles.activeColor,
        };
      case !isSameMonth(day, firstDayOfSelectedMonth):
        return {
          viewBg: styles.transparent,
          bg: styles.transparent,
          color: styles.inactiveColor,
          activeColor: styles.activeColor,
        };
      default:
        return {
          viewBg: styles.transparent,
          bg: styles.transparent,
          color: textColor || styles.black,
          activeColor: styles.activeColor,
        };
    }
  };

  const isDaySelected = (day: Date) => isSameDay(day, selectedDay);

  const isDayToday = (day: Date) => isToday(day);

  const isDayInCurrentMonth = (day: Date) =>
    isSameMonth(day, firstDayOfSelectedMonth);

  const isDayVisible = (day: Date) => {
    if (hideOtherMonthDays) {
      return isDayInCurrentMonth(day);
    }

    return true;
  };

  const isDayHighlighted = (day: Date) => {
    // if highlight is not provided, return false
    if (!highlight) {
      return {
        isBetween: false,
        isFirstDay: false,
        isLastDay: false,
      };
    }

    const { from, to } = highlight;

    const fromDate = parse(from, 'yyyy-MM-dd', new Date());
    const toDate = parse(to, 'yyyy-MM-dd', new Date());

    return {
      // check if day is between from and to date
      isBetween: isWithinInterval(day, { start: fromDate, end: toDate }),
      // check if day is same as from date - this is for styling purpose
      isFirstDay: isSameDay(day, fromDate),
      // check if day is same as to date - this is for styling purpose
      isLastDay: isSameDay(day, toDate),
    };
  };

  const getTodayWeekInMonth = (_date?: Date) => {
    const currentDate = _date || today;

    let res = 0;

    const daysInWeeksArray = splitArrayIntoChunks(allSelectedMonthDays, 7);

    daysInWeeksArray.forEach((week, index) => {
      if (week.some((day) => isSameDay(day, currentDate))) {
        res = index;
        return;
      }
    });

    return res;
  };

  const isDayMarked = (day: Date) => {
    if (!options?.markedDays) {
      return false;
    }

    return options?.markedDays?.includes(format(day, 'yyyy-MM-dd'));
  };

  useEffect(() => {
    /**
     * @NOTE if date is not provided, set selected day to today
     * else set it to the provided date
     */
    const newDate = optionsDate
      ? parse(optionsDate, 'yyyy-MM-dd', new Date())
      : today;

    // if new date is same as selected day, do nothing
    if (isSameDay(newDate, selectedDay)) {
      return;
    }

    // update selected day to new date
    setSelectedDay(newDate);

    // update selected month to new date
    setSelectedMonth(format(newDate, 'MMM-yyyy'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsDate]);

  return {
    today,
    selectedDay,
    selectedMonth,
    allSelectedMonthDays,
    gotoNextMonth,
    gotoPreviousMonth,
    updateSelectedDay,
    getDayStyle,
    isDaySelected,
    isDayToday,
    isDayInCurrentMonth,
    isDayVisible,
    isDayHighlighted,
    isDayMarked,
    getTodayWeekInMonth,
    formatted: {
      displayDate: format(firstDayOfSelectedMonth, 'MMMM yyyy'),
      month: format(firstDayOfSelectedMonth, 'MMMM'),
      year: format(firstDayOfSelectedMonth, 'yyyy'),
      day: format(selectedDay, 'dd'),
      dayOfWeek: format(selectedDay, 'EEEE'),
      dayOfWeekShort: format(selectedDay, 'EEE'),
    },
  };
};
