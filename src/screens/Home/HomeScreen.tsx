import React, { useState, useEffect } from 'react';

// Import all required component
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';

import Contacts from 'react-native-contacts';
import { checkPermission, requestContactsPermission } from '../../helpers/ContactsPermission';
import ListItem from '../../components/ListItem';
import styles from './styles';

interface contacts { }

const HomeScreen = () => {
  let [contacts, setContacts] = useState<contacts[]>([]);

  useEffect(() => {

    (async () => {
      if (Platform.OS === 'android') {
        const result = await requestContactsPermission();
        if (result == true) loadContacts();
      } else {
        loadContacts();
      }
    })();

  }, []);

  const loadContacts = () => {
    console.log("loading contacts");
    Contacts.getAll().then(contacts => {
      setContacts(contacts);
    }).catch(e => {
      console.warn('Permission to access contacts was denied');
    });
  };

  const selectContact = (contact: any) => {
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Access Contact List in React Native
        </Text>
        <TextInput
          // onChangeText={search}
          placeholder="Search"
          style={styles.searchBar}
        />
        <FlatList
          data={contacts}
          renderItem={(contact) => {
            {
              console.log('contact -> ' + JSON.stringify(contact.item.recordID));
            }
            return (
              <ListItem
                key={contact.item.recordID}
                item={contact.item}
                onPress={selectContact}
              />
            );
          }}
          keyExtractor={(item) => item.recordID}
        />
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;