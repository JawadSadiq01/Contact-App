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
import { getSelectedLength } from '../../helpers/Contacts';

interface IContacts {
  recordID: string,
  givenName: string,
  familyName: string,
  isSelected: boolean,
  hasThumbnail: boolean,
  thumbnailPath: string,
  push: () => void,
  pop: () => void
}

const HomeScreen = () => {
  const [contacts, setContacts] = useState<IContacts>([]);
  const [selectedLength, setSelectedLength] = useState(0);
  const [render, setRender] = useState();
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
  useEffect(() => {
    (async () => {
      const length = await getSelectedLength(contacts);
      console.log(length);
      setSelectedLength(length)
    })();

  }, [render]);

  const loadContacts = () => {
    Contacts.getAll().then(contacts => {
      const myContacts: IContacts = [];
      contacts.map((c) => {
        const temp: IContacts = {
          recordID: c.recordID,
          givenName: c.givenName,
          familyName: c.familyName,
          isSelected: false,
          hasThumbnail: c.hasThumbnail,
          thumbnailPath: c.thumbnailPath
        };
        myContacts.push(temp);
      });
      setContacts(myContacts);
    }).catch(e => {
      console.warn('Permission to access contacts was denied');
    });
  };

  const selectContact = (contact: IContact) => {

    let tempContacts = contacts;
    const contactToUpdate = tempContacts.find(c => c.recordID === contact.recordID);
    const indexToUpdate = tempContacts.findIndex(c => c.recordID === contact.recordID);

    if (contactToUpdate) {
      contactToUpdate.isSelected = !contactToUpdate.isSelected;
    }

    if (indexToUpdate !== -1) {
      tempContacts[indexToUpdate] = contactToUpdate;
    }
    setContacts(tempContacts);
    setRender(!render);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>
            Add Participents
          </Text>
          <Text style={styles.headerSpan}>
            {selectedLength} / {contacts.length}
          </Text>
          <TextInput
            // onChangeText={search}
            placeholder="Search"
            style={styles.searchBar}
          />
        </View>

        <View style={styles.horizontalListContainer}>
          <FlatList
            horizontal
            data={contacts}
            renderItem={(contact) => {
              return (
                <>
                  {contact.item.isSelected &&
                    <HorizontalListItem
                      key={contact.item.recordID}
                      item={contact.item}
                      onPress={selectContact} />
                  }
                </>
              );
            }}
            keyExtractor={(item) => item.recordID}
          />
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