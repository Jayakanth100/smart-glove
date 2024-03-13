import * as React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Go to Tab 1"
        onPress={() => navigation.navigate('Tab1')}
      />
      <Button
        title="Go to Tab 2"
        onPress={() => navigation.navigate('Tab2')}
      />
    </View>
  );
}
