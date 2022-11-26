import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer';

const preloadedState = {
    currentUser: null,
    users: [{
        id: 1,
        username: 'Hans',
        password: 'mayer'
    }],
    holebreweries: [],
    breweriescity: [],
    breweriestype: [],
    brewerydataset: [],
    breweryuserdataset: [{
        id: '0',
        name: '',
        favorite: false,
        rating: 0,
        user: "",
        information: "",
    }],
    rendners: 1,
}

const store = configureStore({ reducer, preloadedState })

export default store;
