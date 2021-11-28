/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { addHouse } from '../../store/houseSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../../consts/colors';

const Registration = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    console.log('data', data);
    const newData = { ...data, id: Math.trunc(Math.random() * 100000), image: imageUri }
    console.log('data', newData);
    dispatch(addHouse(newData));
    navigation.navigate('HomeScreen', imageUri);
  };
  const today = new Date();
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  const openCamera = () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      console.log('Response = ', response.assets[0].uri);
      if (response.didCancel) {
        console.log('User cancelled image');
      } else if (response.error) {
        console.log('ImagePicker Error', response.error);
      } else if (response.customButton) {
        console.log('user tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log('sourceUri', source);
        setImageUri(source);
      }
    });
  };
  const openGallery = () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      console.log('Resp', response);
      if (response.didCancel) {
        console.log('User cancelled image');
      } else if (response.error) {
        console.log('ImagePicker Error', response.error);
      } else if (response.customButton) {
        console.log('user tapped custom button: ', response.customButton);
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + response.base64 };
        console.log('sourceUri', source);
        setImageUri(source);
      }
    });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white', fontFamily: 'Montserrat' }}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />

      {/* Logo */}
      <View style={style.logoWrapper}>
        <Image source={require('../../assets/logo.jpg')} style={style.image} />
      </View>
      <ScrollView contentContainerStyle={style.formWrapper}>
        <View style={style.form}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={style.inputLabel}>Property name:</Text>
                <TextInput
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Vinhome, Lake View, ..."
                />
              </>
            )}
            name="propertyName"
          />
          {errors.propertyName && (
            <Text style={style.formError}>This is required.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={style.inputLabel}>Property address:</Text>
                <TextInput
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="HCM, HN, ..."
                />
              </>
            )}
            name="propertyAddress"
          />
          {errors.propertyAddress && (
            <Text style={style.formError}>This is required.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={style.inputLabel}>Property type:</Text>
                <TextInput
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Flat, House, Bungalow ..."
                />
              </>
            )}
            name="propertyType"
          />
          {errors.propertyType && (
            <Text style={style.formError}>This is required.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={style.inputLabel}>Bedrooms:</Text>
                <TextInput
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Studio, 1, 2 ..."
                />
              </>
            )}
            name="bedrooms"
          />
          {errors.bedrooms && (
            <Text style={style.formError}>This is required.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={style.inputLabel}>Date:</Text>
                <TextInput
                  editable={false}
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
            name="date"
            defaultValue={date}
          />
          {errors.date && (
            <Text style={style.formError}>This is required.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={style.inputLabel}>Monthly rent price($):</Text>
                <TextInput
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  placeholder="100"
                />
              </>
            )}
            name="price"
          />
          {errors.price && (
            <Text style={style.formError}>This is required.</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={style.inputLabel}>Furniture types:</Text>
                <TextInput
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Furnished, Unfurnished, Part Furnished, ..."
                />
              </>
            )}
            name="furnitureTypes"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={style.inputLabel}>Notes:</Text>
                <TextInput
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="o di vui lam ne"
                />
              </>
            )}
            name="notes"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={style.inputLabel}>Name of reporter:</Text>
                <TextInput
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Tui ten An"
                />
              </>
            )}
            name="name"
          />
          {errors.name && (
            <Text style={style.formError}>This is required.</Text>
          )}

          <View style={style.imageWrapper}>
            <Text style={style.inputLabel}>image:</Text>
            <View style={style.imgBtn}>
              <Button
                title={'Open Camera'}
                onPress={() => {
                  openCamera();
                }}
              />
            </View>
            <Button
              title={'Open Gallary'}
              onPress={() => {
                openGallery();
              }}
            />
            <Image
              source={imageUri}
              style={{
                marginVertical: 20,
                height: 100,
                width: '100%',
                borderWidth: 1,
                borderColor: 'black',
              }}
            />
          </View>

          {/* Submit Button */}
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: 40,
            }}>
            {/* button */}
            <Pressable onPress={handleSubmit(onSubmit)}>
              {/* <Pressable onPress={() => navigation.navigate('HomeScreen')}> */}
              <View style={style.btn}>
                <Text style={{ color: 'white' }}>Add</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  logoWrapper: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 120,
    resizeMode: 'contain',
  },
  imageWrapper: {
    marginBottom: 20,
  },
  imgBtn: {
    marginVertical: 20,
  },
  formWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '60%',
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  formError: {
    color: 'red',
    marginBottom: 20,
  },
  btn: {
    height: 60,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
export default Registration;
