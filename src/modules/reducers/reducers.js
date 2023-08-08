import { DRAWER_OPEN, SELECTED_DATE,CURRENT_MONTH } from "../actions/actions";
import {getFormattedDate,parseDateString} from "../../utils/calendarUtils";

// Initial state
const initialState = {
    selectedDate: getFormattedDate(new Date()),
    drawerOpen: false,
    currentMonth: parseDateString(getFormattedDate(new Date())),
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_DATE:
            return {...state, selectedDate: action.state};
        case DRAWER_OPEN:
            return {...state, drawerOpen: action.state};
        case CURRENT_MONTH:
            return {...state, currentMonth: action.state};
        default:
            return state;
    }
};

export default rootReducer;
