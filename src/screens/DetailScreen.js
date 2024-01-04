import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperCompo from '../components/WrapperCompo';
import {useTheme} from '../components/ThemeProvider';
import HeaderCompo from '../components/HeaderCompo';
import {singleCountry} from '../api';
import {Card} from 'react-native-paper';
import {COLORS, width} from '../constants/constants';
import CustomTextCompo from '../components/CustomTextCompo';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const DetailScreen = props => {
  const {name} = props.route.params;
  const {isDarkTheme} = useTheme();

  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCountryData();
  }, [name]);

  const getCountryData = async () => {
    try {
      const res = await singleCountry(name);
      setCountry(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WrapperCompo isDarkTheme={isDarkTheme}>
      <HeaderCompo title={name} isBack={true} navigation={props.navigation} />
      {loading ? (
        //Loading...
        <View style={styles.loadingStyle}>
          <ActivityIndicator color={COLORS.primary} size={50} />
        </View>
      ) : (
        // component code
        country.map((item, index) => (
          <View key={index} style={{alignSelf: 'center'}}>
            <View style={styles.imgContainer}>
              <Image
                source={{uri: item.flags.png}}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>

            <Card
              style={{
                padding: 8,
                paddingLeft: 12,
                backgroundColor: isDarkTheme
                  ? COLORS.bgGray
                  : COLORS.bgColorLight,
              }}>
              <CustomTextCompo
                title={'Name'}
                value={item.name.common}
                titleTextStyle={{marginVertical: 4}}
                valueTextStyle={{flexShrink: 1}}
              />
              <CustomTextCompo
                title={'Offial Name'}
                titleTextStyle={{marginVertical: 2}}
                value={item.name.official}
                valueTextStyle={{flexShrink: 1}}
              />
              <CustomTextCompo
                title={'Capital'}
                titleTextStyle={{marginVertical: 2}}
                value={item.capital[0]}
                valueTextStyle={{flexShrink: 1}}
              />
              <CustomTextCompo
                title={'Population'}
                titleTextStyle={{marginVertical: 2}}
                value={item.population.toLocaleString()}
                valueTextStyle={{flexShrink: 1}}
              />
              <CustomTextCompo
                title={'Region'}
                titleTextStyle={{marginVertical: 2}}
                value={item.region}
              />
              <CustomTextCompo
                title={'Subresgion'}
                titleTextStyle={{marginVertical: 2}}
                value={item.subregion}
                valueTextStyle={{flexShrink: 1}}
              />
              <CustomTextCompo
                title={'Currency'}
                titleTextStyle={{marginVertical: 4}}
                value={item.name.official}
              />
            </Card>

            {item?.borders && (
              <Card
                style={[
                  styles.bordersCardStyle,
                  {
                    backgroundColor: isDarkTheme
                      ? COLORS.bgGray
                      : COLORS.bgColorLight,
                  },
                ]}>
                <View style={styles.bordersCntStyle}>
                  {item?.borders?.map((border, i) => (
                    <Text key={i} style={styles.bordersTextStyle}>
                      {border}
                    </Text>
                  ))}
                </View>
              </Card>
            )}
          </View>
        ))
      )}
    </WrapperCompo>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  loadingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imgContainer: {
    width: width * 0.85,
    height: width * 0.7,
    borderRadius: 10,
  },
  bordersCardStyle: {
    marginTop: 24,
  },
  bordersCntStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 8,
  },
  bordersTextStyle: {
    fontSize: 13,
    color: COLORS.fontColor,
    fontFamily: 'Mulish-Bold',
    marginLeft: 4,
  },
});
