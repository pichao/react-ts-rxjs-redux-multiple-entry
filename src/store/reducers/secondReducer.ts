const initialState = {
    name: 'pitter',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'rotate':
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};
