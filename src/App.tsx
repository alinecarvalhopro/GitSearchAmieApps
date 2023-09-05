import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import api from './services/api';
import {MyIcon} from './fragments/MyIcon';

interface IRepository {
  id: string;
  name: string;
  html_url: string;
}

const App = () => {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const findRepositories = async () => {
    if (username == '') {
      Alert.alert('Type a username!');
    } else {
      setLoading(true);
      try {
        const response = await api.get(`${username}/repos`);
        setRepositories(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredInfos: IRepository[] = repositories.filter(
    (repository: IRepository) => {
      return repository.name && repository.html_url && repository.id;
    },
  );



  return (
    <SafeAreaView style={styles.containerApp}>
      <Image source={require('../assets/images/3.png')} />
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
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.textBtn}>Search</Text>
        )}
      </TouchableOpacity>
      <FlatList
        style={styles.repositoryList}
        data={filteredInfos}
        renderItem={({item}) => (
          <View key={item.id} style={styles.repositoryCard}>
            {item.name.length > 25 ? (
              <Text style={styles.repositoryTitle}>{`${item.name.substring(
                0,
                25,
              )}...`}</Text>
            ) : (
              <Text style={styles.repositoryTitle}>{item.name}</Text>
            )}
            <MyIcon
              name="github"
              size={30}
              color="#ED145B"
              onPress={() => {
                Linking.openURL(item.html_url);
              }}
            />
          </View>
        )}
      />
      {repositories.length > 0 ? (
        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => {
            setRepositories([]), setUsername('');
          }}>
          <MyIcon name="bin" size={30} color="#ED145B" />
        </TouchableOpacity>
      ) : null}
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
  repositoryList: {
    width: '100%',
    marginTop: 16,
  },
  repositoryCard: {
    width: '100%',
    padding: 16,
    borderRadius: 5,
    borderColor: '#ED145B',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  repositoryTitle: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  floatBtn: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    // marginTop: 16
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default App;
