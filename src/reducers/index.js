import loginReducer from "./isLogged";
import searchReducer from "./searchReducer";
import dataReducer from "./dataReducer";

import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLoggedIn: loginReducer,
    searchTries: searchReducer,
    data: dataReducer
})

export default allReducers;