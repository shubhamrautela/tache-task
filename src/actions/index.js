export const login = (payload) => {
    return {
        type: 'LOG_IN',
        payload
    };
}

export const logout = ()=> {
    return {
        type: 'LOG_OUT'
    }
}

export const search = () => {
    return {
        type: 'SEARCH'
    }
}

export const searchReset = () => {
    return {
        type: 'SEARCH_RESET'
    }
}

export const setData = (data) => {
    return {
        type: 'SET_DATA',
        payload: data
    }
}

export const resetData = () => {
    return {
        type: 'RESET_DATA'
    }
}