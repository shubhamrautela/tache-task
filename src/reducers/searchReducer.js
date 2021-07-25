const searchReducer = (state = 0, action) => {
    switch(action.type){
        case 'SEARCH': return state+1;
        case 'SEARCH_RESET': return 0;
        
        default: return state;
    }
}

export default searchReducer;