/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions, FlatList, Image,
  Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text,
  TextInput, View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { CATEGORY_LIST, COLORS } from '../../consts/colors';
const { width } = Dimensions.get('screen');
const HomeScreen = ({ navigation, route }) => {
  const houses = useSelector(state => state.houses);
  console.log('houses', JSON.stringify(houses));



  const ListCategories = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
      <View style={style.categoryListContainer}>
        {CATEGORY_LIST.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedCategoryIndex(index)}>
            <Text
              style={[
                style.categoryListText,
                index == selectedCategoryIndex && style.activeCategoryListText,
              ]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };


  const Card = ({ house }) => {
    return (
      <Pressable
        style={style.cardWrapper}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', house)}>
        <View style={style.card}>
          {/* House image */}
          <Image source={house.image ? house.image : require('../../assets/empty.png')} style={style.cardImage} />
          <View style={{ marginTop: 10 }}>
            {/* Title and price container */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {house.propertyName}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: COLORS.blue,
                  fontSize: 16,
                }}>
                ${house.price}
              </Text>
            </View>

            {/* Location text */}

            <Text style={{ color: COLORS.grey, fontSize: 14, marginTop: 5 }}>
              {house.propertyAddress}
            </Text>

            {/* Facilities container */}
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <View style={style.facility}>
                <Icon name="hotel" size={18} />
                <Text style={style.facilityText}>{house.bedrooms}</Text>
              </View>
              <View style={style.facility}>
                <Icon name="home" size={18} />
                <Text style={style.facilityText}>{house.propertyType}</Text>
              </View>
              <View style={style.facility}>
                <Icon name="person" size={18} />
                <Text style={style.facilityText}>{house.name}</Text>
              </View>
              <View style={style.facility}>
                <Icon name="countertops" size={18} />
                <Text style={style.facilityText}>{house.furnitureType}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      {/* Header container */}
      <View style={style.header}>
        <View>
          <Text style={{ color: COLORS.grey }}>Location</Text>
          <Text
            style={{ color: COLORS.dark, fontSize: 20, fontWeight: 'bold' }}>
            Viet Nam
          </Text>
        </View>
        <Image
          style={style.profileImage}
          source={require('../../assets/person.jpg')}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Input and sort button container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View style={style.searchInputContainer}>
            <Icon name="search" color={COLORS.grey} size={25} />
            <TextInput placeholder="Search address, city, location" />
          </View>

          <View style={style.sortBtn}>
            <Icon name="tune" color={COLORS.white} size={25} />
          </View>
        </View>

        {/* Render categories */}
        <ListCategories />

        {/* Render Card */}
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
          data={houses}
          renderItem={({ item, index }) => <Card house={item} key={index} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: '100%',
  },
  optionListsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 40,
  },
  cardWrapper: {
    marginVertical: 10,
  },
  card: {
    height: 250,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  facility: { flexDirection: 'row', marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
});
export default HomeScreen;
