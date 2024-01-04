import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  Pressable,
} from 'react-native';
import {
  TextInput,
  Text,
  ActivityIndicator,
  Appbar,
  Portal,
  Modal,
  Card,
  RadioButton,
} from 'react-native-paper';
import {countryList, filterRegion, singleCountry} from '../api/index';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import {setCountryListData} from '../redux/reducer/countryList';
import {COLORS, width, height} from '../constants/constants';
import CountryCardCompo from '../components/CountryCardCompo';
import {useTheme} from '../components/ThemeProvider';
import ThemeSwitcher from '../components/ThemeSwitch';
import HeaderCompo from '../components/HeaderCompo';
import WrapperCompo from '../components/WrapperCompo';

const regionOptions = [
  {id: 0, name: 'Europe', value: 'Europe'},
  {id: 1, name: 'Asia', value: 'Asia'},
  {id: 2, name: 'Africa', value: 'Africa'},
  {id: 3, name: 'Oceania', value: 'Oceania'},
  {id: 4, name: 'America', value: 'America'},
  {id: 5, name: 'Antarctic', value: 'Antarctic'},
  {id: 6, name: 'All', value: 'All'},
];

const HomeScreen = props => {
  const {isDarkTheme} = useTheme();
  const dispatch = useDispatch();

  const {countryListData} = useSelector(state => state.countryList);
  const [searchCountry, setSearchCountry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const timeout = useRef(null);

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  useEffect(() => {}, [selectedRegion]);

  // ontext change handler and event handler
  const textChangeHandler = val => {
    clearTimeout(timeout.current);
    setSearchCountry(val);
    timeout.current = setTimeout(() => {
      searchHandler(val);
    }, 2000);
  };

  // for saerch handling
  const searchHandler = async name => {
    try {
      if (name.length > 3) {
        setLoading(true);
        const res = await singleCountry(name);
        console.log('zxcvbnm,: ', res.status);
        if (res.status == 200) {
          dispatch(setCountryListData(res?.data));
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setSearchCountry('');
      showMessage({
        type: 'danger',
        message: 'No country found',
        description: 'Please provide proper country name',
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  const handleRadioBtnPress = async newValue => {
    try {
      hideModal();
      setLoading(true);
      if (newValue === 'All') {
        const res = await countryList();
        dispatch(setCountryListData(res?.data));
      } else {
        setSelectedRegion(newValue);
        const res = await filterRegion(newValue);
        dispatch(setCountryListData(res?.data));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WrapperCompo isDarkTheme={isDarkTheme}>
      {loading ? (
        //Loading...
        <View style={styles.loadingStyle}>
          <ActivityIndicator color={COLORS.primary} size={50} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <HeaderCompo title={'Countries'} />

          {/**search component */}
          <View style={styles.searchView}>
            <TextInput
              mode="outlined"
              dense
              autoCorrect={false}
              autoCapitalize="none"
              label={'Search book'}
              outlineColor={'white'}
              theme={{colors: {primary: COLORS.primary}}}
              style={styles.txtInput}
              value={searchCountry}
              right={<TextInput.Icon name="magnify" color={COLORS.primary} />}
              onChangeText={val => {
                textChangeHandler(val);
              }}
            />

            <Pressable style={styles.iconCntStyle} onPress={showModal}>
              <FontAwesome6 name="angle-down" color={COLORS.white} size={22} />
            </Pressable>
          </View>

          {/**flatlist render component */}
          <View style={styles.mainView}>
            {countryListData.length > 0 ? (
              <View style={styles.subView}>
                <FlatList
                  data={countryListData?.slice(0, 10)}
                  showsVerticalScrollIndicator={false}
                  maxToRenderPerBatch={10}
                  style={{}}
                  contentContainerStyle={{
                    paddingVertical: 20,
                    alignItems: 'center',
                  }}
                  ItemSeparatorComponent={() => {
                    return <View style={{height: 16}} />;
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <CountryCardCompo
                        key={index}
                        data={item}
                        isDarkTheme={isDarkTheme}
                        navigation={props.navigation}
                      />
                    );
                  }}
                />
              </View>
            ) : (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>Nothing Found !!!</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <Portal>
        <Modal
          visible={isModalOpen}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalStyle,
            {
              backgroundColor: isDarkTheme
                ? COLORS.bgGray
                : COLORS.bgColorLight,
            },
          ]}>
          <RadioButton.Group
            onValueChange={handleRadioBtnPress}
            value={selectedRegion}>
            {regionOptions.map(item => (
              <View key={item.id} style={styles.radioGrpStyle}>
                <Text>{item.name}</Text>
                <RadioButton value={item.value} />
              </View>
            ))}
          </RadioButton.Group>
        </Modal>
      </Portal>
    </WrapperCompo>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  searchView: {
    marginTop: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  mainView: {
    flex: 1,
  },
  subView: {
    flex: 1,
    width: width,
  },
  txtInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '84%',
  },
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  errorText: {
    fontSize: 20,
    color: 'black',
  },
  iconCntStyle: {
    width: 42,
    height: 42,
    borderRadius: 10,
    marginLeft: 6,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalStyle: {
    backgroundColor: COLORS.white,
    margin: 18,
    borderRadius: 15,
  },
  radioGrpStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});

export default HomeScreen;
