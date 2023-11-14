import { StyleSheet, View } from 'react-native';
import { WeekCalendar, Calendar } from 'react-native-calendar';

export default function App() {
  return (
    <View style={styles.container}>
      <WeekCalendar
        onSelectedDay={(day) => console.log(day)}
        highlight={{ from: '2023-11-14', to: '2023-11-18' }}
      />
      <Calendar
        onSelectedDay={(day) => console.log(day)}
        highlight={{ from: '2023-11-13', to: '2023-11-18' }}
      />
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
