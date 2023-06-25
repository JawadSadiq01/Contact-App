import React, { useState, useEffect } from 'react';
import {
  Platform,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { requestContactsPermission } from '../../helpers/ContactsPermission';
import ListItem from '../../components/VerticalListItem';
import styles from './styles';
import HorizontalListItem from '../../components/HorizontalListItem';
import { getSelectedLength, loadContacts } from '../../helpers/Contacts';
import { IContacts } from '../../Interfaces/interfaces';

const HomeScreen = () => {
  //-------------------> UseStates initializations<----------------------------
  const [contacts, setContacts] = useState<IContacts>([]);
  const [allcontacts, setAllContacts] = useState<IContacts>([]);
  const [selectedLength, setSelectedLength] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  //------------------->Effects<----------------------------
  useEffect(() => {
    //------------------->Asynchronous Function<----------------------------
    (async () => {
      if (Platform.OS === 'android') {
        //------------------->Requesting Contacts Reading Permission<----------------------------
        const result = await requestContactsPermission();
        if (result == true) getAllContacts();
        else { PermissionAlert(); }
      }
      else { getAllContacts(); }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const length = await getSelectedLength(allcontacts);
      setSelectedLength(length);
    })();
  }, [contacts]);

  //------------------->Getting all Contacts from device Contacts Book<----------------------------
  const getAllContacts = async () => {
    (async () => {
      const AllContacts = await loadContacts();
      const dataList = Object.values(AllContacts);
      setContacts(dataList);
      setAllContacts(dataList);
      setLoading(false);
    })();
  };

  //------------------->Searching Contacts<----------------------------
  const SearchContacts = () => {
    setLoading(true);
    const filteredData = allcontacts.filter((item) => {
      return item.givenName.toLowerCase().includes(search.toLowerCase()) || item.familyName.toLowerCase().includes(search.toLowerCase());
    });
    setContacts(filteredData);
    setLoading(false);
  }

  //------------------->Selecting Contacts from all Contacts<----------------------------
  const selectContact = (contact: IContacts, index: number) => {

    const updatedContact = {
      recordID: contact.recordID,
      givenName: contact.givenName,
      familyName: contact.familyName,
      isSelected: !contact.isSelected,
      hasThumbnail: contact.hasThumbnail,
      thumbnailPath: contact.thumbnailPath
    }; // Updated Contact
    updateObjectInArray(index, updatedContact);
  };

  const updateObjectInArray = (index: number, updatedObject: IContacts) => {
    setContacts((prevArray) => {
      const newArray = [...prevArray]; // Create a new array with the same contacts
      newArray[index] = updatedObject; // Update the contact at the specified index
      return newArray; // Return the updated contacts
    });

    setAllContacts((prevArray) => {
      const newArray = [...prevArray]; // Create a new array with the same contacts
      newArray[index] = updatedObject; // Update the contact at the specified index
      return newArray; // Return the updated contacts
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>
            Add Participents
          </Text>
          <Text style={styles.headerSpan}>
            {selectedLength} / {contacts?.length}
          </Text>
          <View style={styles.searchContainer}>
            <View style={styles.searchIcon}>
              <Text>🔎</Text>
            </View>
            <TextInput
              onChangeText={(s) => {
                setSearch(s);
                if (s == "") { setContacts(allcontacts); }
              }}
              cursorColor={"white"}
              value={search}
              placeholderTextColor={'white'}
              placeholder="Search"
              style={styles.searchBar}
              onEndEditing={() => SearchContacts()}
            />
          </View>
        </View>

        <View style={styles.horizontalListContainer}>
          <FlatList
            horizontal
            data={allcontacts}
            snapToInterval={90}
            windowSize={4}
            renderItem={({ item, index }) => (
              <>
                {item?.isSelected &&
                  <HorizontalListItem
                    key={item.recordID}
                    item={item}
                    onPress={selectContact}
                    index={index}
                  />
                }
              </>
            )
            }
            keyExtractor={(item) => item.recordID}
          />
        </View>

        {!loading ? <View>
          {contacts?.length > 0 ?
            <FlatList
              windowSize={4}
              data={contacts}
              removeClippedSubviews
              disableVirtualization={false}
              keyExtractor={(item) => item.recordID}
              maxToRenderPerBatch={5}
              renderItem={({ item, index }) => (
                <ListItem
                  key={item.recordID}
                  item={item}
                  onPress={selectContact}
                  index={index}
                />
              )}
            />
            :
            <NoContactsMsg />
          }
        </View>
          : <ContactsLoading />
        }
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

const ContactsLoading = () => {
  return (
    <View style={styles.noContactsMsg}>
      <Text style={styles.noContactsMsgText} >
        Loading...
      </Text>
    </View>
  )
}

const PermissionAlert = () => Alert.alert(
  "Permissions Error",
  "Please grant contacts read permission!",
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]
)

export default HomeScreen;