const intitialState = {};

const enrolledClassrooms = (state = intitialState,action)=>{
    switch (action.type) {
        case 'UPDATE_THEMES':return action.payload;
        default:
            return state;
    }
}
export default enrolledClassrooms;