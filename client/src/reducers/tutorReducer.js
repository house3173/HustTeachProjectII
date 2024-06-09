export const tutorReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case "RESET_AM_TAG":
            localStorage.setItem('tutorState', JSON.stringify(payload));
            return {
                ...state,
                am_tag: payload.am_tag
            }
        default:
            return state
    }

}