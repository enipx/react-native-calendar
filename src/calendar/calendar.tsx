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
  const { font, days, textStyle, ...rest } = props;

  return (
    <Flex width="100%" {...rest} size={undefined}>
      {days.map((day, index) => {
        return (
          <View center flex={1} key={index}>
            <Text font={font} opacity={0.6} style={textStyle}>
              {day}
            </Text>
          </View>
        );
      })}
    </Flex>
  );
};

export const CalendarHeader = (props: CalenderHeaderProps) => {
  const {
    onNextPress,
    onPreviousPress,
    previousElement,
    nextElement,
    previousElementStyle,
    nextElementStyle,
    title,
    font,
    size = 40,
  } = props;

  return (
    <Flex centerY px={16} pb={12}>
      <View flex={1}>
        <Text weight="500" font={font}>
          {title}
        </Text>
      </View>

      <Flex>
        <Button
          size={size}
          onPress={onPreviousPress}
          style={previousElementStyle}
        >
          {previousElement || (
            <Text font={font} opacity={0.5}>
              {'<'}
            </Text>
          )}
        </Button>
        <Button
          width={size / 1.5}
          height={size}
          onPress={onNextPress}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[{ alignItems: 'flex-end' }, nextElementStyle]}
        >
          {nextElement || (
            <Text font={font} opacity={0.5}>
              {'>'}
            </Text>
          )}
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
    isMarked,
    markColor,
    markSize = 4,
    markStyle,
    styling,
    hide,
    onSelectedDay,
    containerStyle,
    textStyle,
    style,
    font,
    selectedDayStyle,
    todayStyle,
    borderRadius,
  } = props;

  const radius = borderRadius || borderRadius === 0 ? borderRadius : size;

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
        containerStyle,
        isHighlightStart
          ? {
              borderTopLeftRadius: radius,
              borderBottomLeftRadius: radius,
            }
          : {},
        isHighlightEnd
          ? {
              borderTopRightRadius: radius,
              borderBottomRightRadius: radius,
            }
          : {},
      ]}
      my={4}
    >
      {(isHighlightStart || isHighlightEnd) && isSelected ? (
        <View
          position="absolute"
          height="100%"
          width="100%"
          borderRadius={radius}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ left: 0, top: 0 }}
          bg={styling?.activeColor}
        />
      ) : null}
      <Button
        borderRadius={radius}
        size={size}
        bg={styling?.bg}
        onPress={() => {
          if (hide) return;
          onSelectedDay?.(day);
        }}
        style={[
          style,
          isToday ? todayStyle : {},
          isSelected ? selectedDayStyle : {},
        ]}
      >
        <Text
          weight={isToday || isSelected ? '500' : undefined}
          color={styling?.color}
          font={font}
          style={textStyle}
        >
          {day.getDate()}
        </Text>
        {isMarked && !isSelected ? (
          <View
            borderRadius={markSize}
            position="absolute"
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              { bottom: 4, left: '50%', transform: [{ translateX: -2 }] },
              markStyle,
            ]}
            size={markSize}
            bg={markColor || styling?.activeColor}
          />
        ) : null}
      </Button>
    </View>
  );
};

export const Calendar = (props: CalendarProps) => {
  const {
    formatted,
    gotoNextMonth,
    gotoPreviousMonth,
    allSelectedMonthDays,
    isDayToday,
    isDaySelected,
    updateSelectedDay,
    isDayHighlighted,
    getDayStyle,
    isDayVisible,
    isDayMarked,
  } = useCalendar(props);

  return (
    <View>
      <CalendarHeader
        title={formatted.displayDate}
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

            const marked = isDayMarked(day);

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
                isMarked={marked}
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
    isDayMarked,
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
  }, [getTodayWeekInMonth]);

  return (
    <View width="100%">
      <WeekDaysText mb={12} days={AllWeekDays.mid} {...props} />

      <ScrollView
        ref={scrollViewRef}
        scrollToOverflowEnabled
        horizontal
        pagingEnabled
      >
        <Flex width="100%">
          {allSelectedMonthDays.map((day, index) => {
            const styling = getDayStyle(day);

            const hide = !isDayVisible(day);

            const { isFirstDay, isLastDay, isBetween } = isDayHighlighted(day);

            const marked = isDayMarked(day);

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
                isMarked={marked}
              />
            );
          })}
        </Flex>
      </ScrollView>
    </View>
  );
};
