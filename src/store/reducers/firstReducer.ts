const initialState = {
    showAlert: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_SUCCESS':
            console.log(action), 'bbbbbbbbbbbb';
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};
