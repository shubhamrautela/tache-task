const dataReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_DATA': return action.payload;break;
        case 'RESET_DATA': return [];break;
        default: return state;
    }
}

export default dataReducer;