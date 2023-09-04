import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.containerApp}>
      <Text style={styles.title}>Git Search</Text>
      <Text style={styles.instruction}>
        Find a Github user's public repositories
      </Text>
      <TextInput style={styles.searchInput} placeholder="Type here the username" placeholderTextColor="#FFFFFF"/>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.textBtn}>Search</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerApp: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: '#ED145B',
    fontSize: 30,
  },
  instruction: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16
  },
  searchInput: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderColor: '#ED145B',
    borderWidth: 1,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    marginTop: 16,
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#ED145B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  textBtn: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default App;
