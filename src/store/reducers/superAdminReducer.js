import { AREA, SITES } from "../types/types";

const initialState = {
  sites: [],
  totalUsedArea: 0
};

const superAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SITES:
      const combinedArray = [...state.sites, ...action.payload].reduce((acc, obj) => {
        if (!acc[obj.uuid]) {
          acc[obj.uuid] = obj;
        }
        return acc;
      }, {});
      return {
        ...state,
        sites: [...Object.values(combinedArray)],
      };
    case AREA:
      return {
        ...state,
        totalUsedArea: action.payload,
      };
    default:
      return state;
  }
};

export default superAdminReducer;
