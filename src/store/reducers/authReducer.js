import { USER } from "../types/types"


const initialState = {
    userInfo: {}
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case USER: return {
            ...state,
            userInfo: action.payload
        }
        default: return state
    }
}
export default authReducer;