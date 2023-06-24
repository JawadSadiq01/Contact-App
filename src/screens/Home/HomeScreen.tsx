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
import { loadContacts } from '../../helpers/Contacts';
import { IContacts } from '../../Interfaces/interfaces';

const HomeScreen = () => {
  //-------------------> UseStates initializations<----------------------------
  const [contacts, setContacts] = useState<IContacts>([]);
  const [allcontacts, setAllContacts] = useState<IContacts>([]);
  const [hashData, setHashData] = useState({});
  const [selectedHashData, setSelectedHashData] = useState({});
  const [search, setSearch] = useState("");
  const [render, setRender] = useState(false);
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

  //------------------->Getting all Contacts from device Contacts Book<----------------------------
  const getAllContacts = async () => {
    (async () => {
      const AllContacts = await loadContacts();
      const dataList = Object.values(AllContacts);
      setHashData(AllContacts);
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
  const selectContact = (contact: IContacts) => {
    var currentHashData = selectedHashData;

    if (currentHashData[contact.recordID]) {
      //-------------->Removing Contact from Selected contacts<-------------------
      delete currentHashData[contact.recordID];
    }
    else {
      //-------------->Adding Contact in Selected contacts<-------------------
      const value = {
        recordID: contact.recordID,
        givenName: contact.givenName,
        familyName: contact.familyName,
        isSelected: true,
        hasThumbnail: contact.hasThumbnail,
        thumbnailPath: contact.thumbnailPath
      };
      var currentHashData = ({ ...currentHashData, [contact.recordID]: value });
      setSelectedHashData(currentHashData);
    }
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
            {Object.values(selectedHashData).length} / {contacts?.length}
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
            data={Object.values(selectedHashData)}
            renderItem={(contact) => {
              return (
                <>
                  {contact?.item?.isSelected &&
                    <HorizontalListItem
                      key={contact.item.recordID}
                      item={contact.item}
                      onPress={selectContact}
                    />
                  }
                </>
              );
            }}
            keyExtractor={(item) => item.recordID}
          />
        </View>

        {!loading ? <View>
          {contacts?.length > 0 ?
            <FlatList
              data={contacts}
              renderItem={(contact) => {
                return (
                  <ListItem
                    key={contact.item.recordID}
                    item={contact.item}
                    onPress={selectContact}
                    selectedHashData={selectedHashData}
                  />
                );
              }}
              keyExtractor={(item) => item.recordID}
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