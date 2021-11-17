import { configureStore } from '@reduxjs/toolkit';
import houseReducer from './houseSlice';

const rootReducer = {
    houses: houseReducer,
};
const store = configureStore({
    reducer: rootReducer,
});

export default store;
