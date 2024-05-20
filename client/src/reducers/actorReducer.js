export const actorReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case "RESET_ACTOR":
            localStorage.setItem('actorState', JSON.stringify(payload));
            return {
                ...state,
                actor: payload
            }
        default:
            return state
    }

}