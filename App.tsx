import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { DocumentDirectoryPath } from 'react-native-fs';
import { readFile, writeFile } from './Utils/Files';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <Button title="Write"
        onPress={() => {
          writeFile(`${DocumentDirectoryPath}/fouad.txt`, 'TExt I write', 'utf8')
        }}
      />


      <Button title="read"
        onPress={() => {
          readFile(`${DocumentDirectoryPath}/fouad.txt`, 'utf8')
        }}
      />

    </SafeAreaView>
  );
};

export default App;
