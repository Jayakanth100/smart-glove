import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to our IOT Project App</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tab1')}>
        <Text style={styles.buttonText}>Spine POS Detection</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tab2')}>
        <Text style={styles.buttonText}>Sign Language Convertor</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

function Tab1Screen() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://your-node-server-ip-address:3000/api/tab1');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showMessage = () => {
    Alert.alert(
      'Message Title',
      'This is the message text.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab 1</Text>
      <Text onPress={showMessage} style={styles.message}>Click here to show message</Text>
      <Text style={styles.serverData}>{message}</Text>
      <Text style={styles.serverData}>{data}</Text>
    </View>
  );
}

function Tab2Screen() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://your-node-server-ip-address:3000/api/tab2');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab 2</Text>
      {data ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>{JSON.stringify(data)}</Text>
        </View>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tab1" component={Tab1Screen} />
        <Tab.Screen name="Tab2" component={Tab2Screen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  serverData: {
    marginTop: 20,
    fontSize: 16,
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dataText: {
    fontSize: 16,
  },
});
