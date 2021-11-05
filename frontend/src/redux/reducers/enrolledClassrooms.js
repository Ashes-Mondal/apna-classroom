const intitialState = [];

const enrolledClassrooms = (state = intitialState, action) => {
    switch (action.type) {
        case "UPDATE_CLASSROOMS":
            return action.payload;
        case "PUSH_CLASSROOM":
            return [...state, action.payload];
        case "REMOVE_FROM_CLASSROOM":
            return state.filter(item=>item!==action.payload);
        default:
            return state;
    }
};
export default enrolledClassrooms;
