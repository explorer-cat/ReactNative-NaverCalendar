// Action Types
export const SELECTED_DATE = 'SELECTED_DATE';
export const DRAWER_OPEN = 'DRAWER_OPEN';
export const CURRENT_MONTH = 'CURRENT_MONTH';
// Action Creators
export const selectedDate = (state) => {
    return {
        type: SELECTED_DATE,
        state : state
    };
};
export const setCurrentMonth = (state) => {
    return {
        type: CURRENT_MONTH,
        state : state
    };
};


export const setDrawerOpen = (state) => {
    return {
        type: DRAWER_OPEN,
        state : state
    };
};
