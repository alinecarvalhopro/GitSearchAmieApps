import React, {MutableRefObject, ObjectHTMLAttributes, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api from './services/api';

interface IRepository {
  id: string;
  name: string;
  html_url: string;
}

const App = () => {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState([]);

  const findRepositories = async () => {
    try {
      const response = await api.get(`${username}/repos`);
      setRepositories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const filteredInfos: IRepository[] = repositories.filter(
    (repository: IRepository) => {
      return repository.name && repository.html_url && repository.id;
    },
  );

  return (
    <SafeAreaView style={styles.containerApp}>
      <Text style={styles.title}>Git Search</Text>
      <Text style={styles.instruction}>
        Find a Github user's public repositories
      </Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Type here the username"
        placeholderTextColor="#FFFFFF"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.btn} onPress={findRepositories}>
        <Text style={styles.textBtn}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredInfos}
        renderItem={({item}) => (
          <View key={item.id}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
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
    marginTop: 16,
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
  cardRepository: {
    width: '100%',
    height: 50,
  },
});

export default App;
