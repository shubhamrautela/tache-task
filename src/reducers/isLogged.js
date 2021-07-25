const loginReducer = (state = false, action) => {
    switch(action.type){
        case 'LOG_IN': return action.payload;
        case 'LOG_OUT': return false;
        default: return state;
    }
}

export default loginReducer;