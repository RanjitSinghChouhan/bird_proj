
import { COMPANY } from "../types/types"


const initialState = {
    userInfo: {}
}

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMPANY: return {
            ...state,
            userInfo: action.payload
        }
        default: return state
    }
}
export default companyReducer;