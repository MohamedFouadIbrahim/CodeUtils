import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar
} from 'react-native';
declare const global: { HermesInternal: null | {} };

const App = () => {

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <Button title="Write"
        onPress={() => { }}
      />

      <Button title="read"
        onPress={() => { }}
      />

    </SafeAreaView>
  );
};

export default App;
