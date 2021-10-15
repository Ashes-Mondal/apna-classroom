const intitialState = [];

const enrolledClassrooms = (state = intitialState,action)=>{
    switch (action.type) {
        case 'UPDATE_CLASSROOMS':return action.payload;
        default:
            return state;
    }
}
export default enrolledClassrooms;