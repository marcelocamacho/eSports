import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello react native!</Text>
      <Button title='Send 1'></Button>
      <Button title='Send 2'></Button>
      <Button title='Send 3'></Button>
      <Button title='Send 4'></Button>
      <StatusBar style="auto"/>
    </View>
  );
}
interface ButtonProps{
  title:string
}
function Button(props: ButtonProps){
  return (
    <TouchableOpacity>
      <Text style={styles.title}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    color: '#FFF',
    fontSize: 21
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
