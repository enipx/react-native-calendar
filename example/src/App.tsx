import { StyleSheet, View } from 'react-native';
import { WeekCalendar, Calendar } from 'react-native-calendar';
import { Wrapper } from './components/wrapper';

export default function App() {
  return (
    <View style={styles.container}>
      <Wrapper title=" Calendar">
        <Calendar
          onSelectedDay={(day) => console.log(day)}
          highlight={{ from: '2023-11-13', to: '2023-11-18' }}
          markedDays={['2023-11-01', '2023-11-18', '2023-11-20']}
          size={44}
          // borderRadius={0}
        />
      </Wrapper>
      <Wrapper title="Week Calendar">
        <WeekCalendar
          onSelectedDay={(day) => console.log(day)}
          highlight={{ from: '2023-11-15', to: '2023-11-18' }}
        />
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
