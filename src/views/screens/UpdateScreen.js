/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../consts/colors';
import { updateHouse } from '../../store/houseSlice';

const UpdateScreen = ({ navigation, route }) => {
    const house = route.params;
    const [imageUri, setImageUri] = useState(house.image);
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = data => {
        const newData = { ...data, id: house.id, image: imageUri }
        console.log('updatedData', JSON.stringify(newData));
        dispatch(updateHouse(newData));
        navigation.navigate('HomeScreen');
    };
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
                        defaultValue={house.propertyName}
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
                        defaultValue={house.propertyAddress}
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
                        defaultValue={house.propertyType}
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
                        defaultValue={house.bedrooms}
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
                                <Pressable onPress={() => setOpen(true)}>
                                    <TextInput
                                        editable={false}
                                        style={style.input}
                                        onBlur={onBlur}
                                        value={value}
                                    />
                                </Pressable>
                                <DatePicker
                                    mode={'date'}
                                    modal
                                    open={open}
                                    date={new Date()}
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        onChange(moment(date).format("DD-MM-YYYY"))
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}

                                />
                            </>
                        )}
                        name="date"
                        defaultValue={house.date}
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
                        defaultValue={house.price}
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
                        name="furnitureType"
                        defaultValue={house.furnitureType}
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
                        defaultValue={house.notes}
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
                        defaultValue={house.name}
                    />
                    {errors.name && (
                        <Text style={style.formError}>This is required.</Text>
                    )}

                    <View style={style.imageWrapper}>
                        <Text style={style.inputLabel}>image:</Text>
                        <View style={style.imgBtn}>
                            <Pressable onPress={() => {
                                openCamera();
                            }}>
                                <View style={style.camBtn}>
                                    <Text style={{ color: 'white' }}>Open Camera</Text>
                                </View>
                            </Pressable>

                            <Pressable onPress={() => {
                                openGallery();
                            }}>
                                <View style={style.camBtn}>
                                    <Text style={{ color: 'white' }}>Open Gallary</Text>
                                </View>
                            </Pressable>
                            <Image
                                source={imageUri ? imageUri : require('../../assets/empty.png')}
                                style={{
                                    marginVertical: 20,
                                    height: 100,
                                    width: '100%',
                                }}
                            />

                        </View>
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
                                <Text style={{ color: 'white' }}>Update</Text>
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
    camBtn: {
        marginVertical: 5,
        height: 60,
        backgroundColor: 'black',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
});
export default UpdateScreen;
