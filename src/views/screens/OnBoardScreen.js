/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import COLORS from '../../consts/colors';
const OnBoardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />

      {/* Onboarding Image */}
      <Image
        source={require('../../assets/onboardImage.jpg')}
        style={style.image}
      />

      {/* Title and text container */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        {/* Title container */}
        <View>
          <Text style={style.title}>Find your</Text>
          <Text style={style.title}>sweet home</Text>
        </View>

        {/* Text container */}
        <View style={{ marginTop: 10 }}>
          <Text style={style.textStyle}>
            Thien An will help you find your home
          </Text>
        </View>
      </View>

      {/* Button container */}
      <View style={style.btnContainer}>
        {/* button */}
        <Pressable
          style={style.btn}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={{ color: 'white' }}>Get Started</Text>
        </Pressable>
        <Pressable
          style={style.btn}
          onPress={() => navigation.navigate('Registration')}>
          <Text style={{ color: 'white' }}>Add</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    height: 420,
    width: '100%',
    borderBottomLeftRadius: 100,
  },
  indicatorContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 40,
  },
  btn: {
    height: 60,
    width: '40%',
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: { fontSize: 32, fontWeight: 'bold' },
  textStyle: { fontSize: 16, color: COLORS.grey },
});
export default OnBoardScreen;
