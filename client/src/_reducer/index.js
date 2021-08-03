// 각 기능에 대한 다양한 리듀서들, 나눠져 있는 것을
// 콤바인 리듀서를 이용해서 root reducer에서 하나로
// 합쳐줌
import { combineReducers } from "redux";
import user from './user_reducer';


const rootReducer = combineReducers({
    user
});

export default rootReducer; 