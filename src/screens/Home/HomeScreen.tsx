import React, { useState, useEffect } from 'react';
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
import { requestContactsPermission } from '../../helpers/ContactsPermission';
import ListItem from '../../components/VerticalListItem';
import styles from './styles';
import HorizontalListItem from '../../components/HorizontalListItem';

interface contacts { }

const HomeScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

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
      const myContacts = [];
      contacts.map((c) => {
        // console.log(c);
        const temp = {
          recordID: c.recordID,
          givenName: c.givenName,
          familyName: c.familyName,
          isSelected: false,
          hasThumbnail: c.hasThumbnail,
          thumbnailPath: c.thumbnailPath
        };
        myContacts.push(temp);
      });
      // console.log(myContacts);
      setContacts(myContacts);
    }).catch(e => {
      console.warn('Permission to access contacts was denied');
    });
  };

  const selectContact = (contact: any) => {
    let tempContacts = contacts;
    const contactToUpdate = tempContacts.find(c => c.recordID === contact.recordID);
    const indexToUpdate = tempContacts.findIndex(c => c.recordID === contact.recordID);

    if (contactToUpdate) {
      contactToUpdate.isSelected = !contactToUpdate.isSelected;
    }

    if (indexToUpdate !== -1) {
      tempContacts[indexToUpdate] = contactToUpdate;
    }
    console.log(contacts, "\n", tempContacts);
    setContacts(tempContacts);
  };

  console.log("updated");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>
            Add Participents
          </Text>
          <Text style={styles.headerSpan}>
            1/256
          </Text>
          <TextInput
            // onChangeText={search}
            placeholder="Search"
            style={styles.searchBar}
          />
        </View>

        <View style={styles.horizontalListContainer}>
          {contacts.length > 0 ?
            <FlatList
              horizontal
              data={contacts}
              renderItem={(contact) => {
                return (
                  <HorizontalListItem
                    key={contact.item.recordID}
                    item={contact.item}
                    onPress={selectContact}
                  />
                );
              }}
              keyExtractor={(item) => item.recordID}
            />
            :
            <NoContactsMsg />
          }
        </View>

        <View>
          {contacts.length > 0 ?
            <FlatList
              data={contacts}
              renderItem={(contact) => {
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
            :
            <NoContactsMsg />
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

const NoContactsMsg = () => {
  return (
    <View style={styles.noContactsMsg}>
      <Text style={styles.noContactsMsgText} >
        No Contacts to show!
      </Text>
    </View>
  )
}
export default HomeScreen;