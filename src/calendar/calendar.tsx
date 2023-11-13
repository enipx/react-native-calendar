import { AllWeekDays, getDeviceLayout } from '../helper/base';
import type {
  CalendarProps,
  CalenderHeaderProps,
  WeekCalendarProps,
  WeekDaysTextProps,
} from './calendar.type';
import { Button, Flex, Text, View } from '../themed';
import { useCalendar } from '../hooks/use-calender';
import GestureRecognizer from '../themed/gesture';

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

export const WeekCalendar = (props: WeekCalendarProps) => {
  return (
    <View>
      <WeekDaysText days={AllWeekDays.mid} {...props} />
    </View>
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

export const Calendar = (props: CalendarProps) => {
  const {
    isDayToday,
    isDaySelected,
    updateSelectedDay,
    formated,
    gotoNextMonth,
    gotoPreviousMonth,
    allSelectedMonthDays,
    getDayStyle,
    isDayVisible,
  } = useCalendar(props);

  const size = 40;

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
            let { color, bg } = getDayStyle(day);

            const hide = !isDayVisible(day);

            return (
              <View
                width={getDeviceLayout(AllWeekDays.short.length).width}
                key={index}
                height={size}
                center
                opacity={hide ? 0 : 1}
              >
                <Button
                  borderRadius={size}
                  size={size}
                  bg={bg}
                  onPress={() => {
                    if (hide) return;
                    updateSelectedDay(day);
                  }}
                >
                  <Text
                    weight={
                      isDayToday(day) || isDaySelected(day) ? '500' : undefined
                    }
                    color={color}
                  >
                    {day.getDate()}
                  </Text>
                </Button>
              </View>
            );
          })}
        </Flex>
      </GestureRecognizer>
    </View>
  );
};
