/* eslint-disable no-shadow */
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    propertyName: 'Vinhome',
    propertyAddress: 'Binh Thanh',
    propertyType: 'Apartment',
    bedrooms: 1,
    date: '28-10-2021',
    price: 1000,
    furnitureType: 'Furnished',
    name: 'Andy tang',
    notes: 'Nha moi xay...',
    image: require('../assets/house1.jpg'),
    interiors: [
      require('../assets/interior1.jpg'),
      require('../assets/interior2.jpg'),
      require('../assets/interior3.jpg'),
    ],
  },
  {
    id: 2,
    propertyName: 'Vinhome',
    propertyAddress: 'Thu duc',
    propertyType: 'Apartment',
    bedrooms: 2,
    date: '28-10-2021',
    price: 1500,
    furnitureType: 'Furnished',
    name: 'Thien An',
    notes: 'Nha xay 2 nam roi ne...',
    image: require('../assets/house2.jpg'),
    interiors: [
      require('../assets/interior1.jpg'),
      require('../assets/interior2.jpg'),
      require('../assets/interior3.jpg'),
    ],
  },
  {
    id: 3,
    propertyName: 'Lake View',
    propertyAddress: 'Quan 2',
    propertyType: 'House',
    bedrooms: 2,
    date: '28-10-2021',
    price: 1000,
    furnitureType: 'Furnished',
    name: 'Thien An',
    notes: 'Gan sala nen vui...',
    image: require('../assets/house3.jpg'),
    interiors: [
      require('../assets/interior1.jpg'),
      require('../assets/interior2.jpg'),
      require('../assets/interior3.jpg'),
    ],
  },
  {
    id: 4,
    propertyName: 'Lake view',
    propertyAddress: 'Quan 2',
    propertyType: 'House',
    bedrooms: 3,
    date: '28-10-2021',
    price: 1500,
    furnitureType: 'Furnished',
    name: 'Thien An',
    notes: 'Cung vi gan sala nen vui...',
    image: require('../assets/house4.jpg'),
    interiors: [
      require('../assets/interior1.jpg'),
      require('../assets/interior2.jpg'),
      require('../assets/interior3.jpg'),
    ],
  },
];

//house slice
const house = createSlice({
  name: 'home',
  initialState,
  reducers: {
    addHouse: (state, action) => {
      const newState = {
        id: state[state.length].id++,
        ...action.payload,
      };
      console.log('newState', newState);
      state.push(newState);
    },
    removeHouse: (state, action) => {
      state.filter(house => house.id !== action.payload);
      console.log('state', state)
    },
  },
});

//Reducer, Action
const { reducer, actions } = house;
//Export all action
export const { addHouse, removeHouse } = actions;
//Export Reducer
export default reducer;
