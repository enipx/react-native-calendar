import { AllWeekDays, getDeviceLayout } from '../helper/base';
import type {
  CalendarDayProps,
  CalendarProps,
  CalenderHeaderProps,
  WeekCalendarProps,
  WeekDaysTextProps,
} from './calendar.type';
import { Button, Flex, ScrollView, Text, View } from '../themed';
import { useCalendar } from '../hooks/use-calender';
import GestureRecognizer from '../themed/gesture';
import { useEffect, useRef } from 'react';

export const WeekDaysText = (props: WeekDaysTextProps) => {
  const { font, days, ...rest } = props;

  return (
    <Flex width="100%" {...rest}>
      {days.map((day, index) => {
        return (
          <View center flex={1} key={index}>
            <Text font={font} opacity={0.6}>
              {day}
            </Text>
          </View>
        );
      })}
    </Flex>
  );
};

export const CalendarHeader = (props: CalenderHeaderProps) => {
  const { onNextPress, onPreviousPress, previousElement, nextElement, title } =
    props;

  const buttonSize = 40;

  return (
    <Flex centerY px={16} py={12}>
      <View flex={1}>
        <Text weight="500">{title}</Text>
      </View>

      <Flex>
        <Button size={buttonSize} onPress={onPreviousPress}>
          {previousElement || <Text opacity={0.5}>{'<'}</Text>}
        </Button>
        <Button
          width={buttonSize / 1.5}
          height={buttonSize}
          onPress={onNextPress}
          style={{ alignItems: 'flex-end' }}
        >
          {nextElement || <Text opacity={0.5}>{'>'}</Text>}
        </Button>
      </Flex>
    </Flex>
  );
};

export const CalendarDay = (props: CalendarDayProps) => {
  const {
    day,
    size = 40,
    isToday,
    isSelected,
    isHighlightEnd,
    isHighlightStart,
    styling,
    hide,
    onSelectedDay,
    contentStyle,
    textStyle,
    style,
  } = props;

  return (
    <View
      width={getDeviceLayout(AllWeekDays.short.length).width}
      height={size}
      center
      bg={styling?.viewBg}
      opacity={hide ? 0 : 1}
      overflow="hidden"
      position="relative"
      style={[
        isHighlightStart
          ? {
              borderTopLeftRadius: size,
              borderBottomLeftRadius: size,
            }
          : {},
        isHighlightEnd
          ? {
              borderTopRightRadius: size,
              borderBottomRightRadius: size,
            }
          : {},
      ]}
      my={4}
      {...contentStyle}
    >
      {(isHighlightStart || isHighlightEnd) && isSelected ? (
        <View
          position="absolute"
          height="100%"
          width="100%"
          borderRadius={size}
          style={{ left: 0, top: 0 }}
          bg={styling?.activeColor}
        />
      ) : null}
      <Button
        borderRadius={size}
        size={size}
        bg={styling?.bg}
        onPress={() => {
          if (hide) return;
          onSelectedDay?.(day);
        }}
        {...style}
      >
        <Text
          weight={isToday || isSelected ? '500' : undefined}
          color={styling?.color}
          {...textStyle}
        >
          {day.getDate()}
        </Text>
      </Button>
    </View>
  );
};

export const Calendar = (props: CalendarProps) => {
  const {
    formated,
    gotoNextMonth,
    gotoPreviousMonth,
    allSelectedMonthDays,
    isDayToday,
    isDaySelected,
    updateSelectedDay,
    isDayHighlighted,
    getDayStyle,
    isDayVisible,
  } = useCalendar(props);

  return (
    <View>
      <CalendarHeader
        title={formated.displayDate}
        onNextPress={gotoNextMonth}
        onPreviousPress={gotoPreviousMonth}
      />

      <GestureRecognizer
        onSwipeLeft={gotoNextMonth}
        onSwipeRight={gotoPreviousMonth}
      >
        <WeekDaysText mb={12} days={AllWeekDays.short} {...props} />

        <Flex width="100%" flexWrap="wrap">
          {allSelectedMonthDays.map((day, index) => {
            const styling = getDayStyle(day);

            const hide = !isDayVisible(day);

            const { isFirstDay, isLastDay, isBetween } = isDayHighlighted(day);

            return (
              <CalendarDay
                {...props}
                key={`${day.toTimeString()}-${index}`}
                day={day}
                styling={styling}
                hide={hide}
                isHighlightEnd={isLastDay}
                isHighlightStart={isFirstDay}
                isHighlighted={isBetween}
                isToday={isDayToday(day)}
                isSelected={isDaySelected(day)}
                onSelectedDay={updateSelectedDay}
              />
            );
          })}
        </Flex>
      </GestureRecognizer>
    </View>
  );
};

export const WeekCalendar = (props: WeekCalendarProps) => {
  const {
    allSelectedMonthDays,
    isDayToday,
    isDaySelected,
    updateSelectedDay,
    isDayHighlighted,
    getDayStyle,
    isDayVisible,
    getTodayWeekInMonth,
  } = useCalendar(props);

  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    if (!scrollViewRef.current) return;

    const week = getTodayWeekInMonth();

    if (week === 0) return;

    scrollViewRef.current?.scrollTo({
      x: getDeviceLayout().width * week,
      y: 0,
      animated: true,
    });
  }, []);

  return (
    <View width="100%">
      <WeekDaysText mb={12} days={AllWeekDays.mid} {...props} />

      <ScrollView ref={scrollViewRef} horizontal pagingEnabled>
        <Flex width="100%">
          {allSelectedMonthDays.map((day, index) => {
            const styling = getDayStyle(day);

            const hide = !isDayVisible(day);

            const { isFirstDay, isLastDay, isBetween } = isDayHighlighted(day);

            return (
              <CalendarDay
                {...props}
                key={`${day.toTimeString()}-${index}`}
                day={day}
                styling={styling}
                hide={hide}
                isHighlightEnd={isLastDay}
                isHighlightStart={isFirstDay}
                isHighlighted={isBetween}
                isToday={isDayToday(day)}
                isSelected={isDaySelected(day)}
                onSelectedDay={updateSelectedDay}
              />
            );
          })}
        </Flex>
      </ScrollView>
    </View>
  );
};
