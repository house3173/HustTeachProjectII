export const classReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case "DETAIL_CLASS":
            localStorage.setItem('selectedClass', JSON.stringify(payload));
            return {
                ...state,
                class: payload
            }
        default:
            return state
    }

}