import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
  리덕스 스토어 안에 모든 스테이트를 관리하게 되는데 스토어의 스테이트를
  변경하려면, state를 dispatch를 이용해서 action으로 변경 가능.
  action은 plain object, 객체의 형식이어야 스토어가 action을 받을 수 있다
  스토어에서 언제나 객체 형식으로 된 액션을 받는 것이 아닌 어쩔 땐
  promise형식으로 된 것을 받을 때도 있고, function 형태로 된 것을 받을 때도 있다.
  promise, function형식으로 오면 리덕스 스토어에서 못 받지만,
  리덕스 썽크는 디스패치한테 어떻게 function을 받는지 알려주고,
  리덕스 프로미스 같은 경우 디스패치한테 promise가 왔을 때 어떻게 대처하는지를
  알려주는 역할을 한다. 
*/

// 앱에 리덕스를 연결 시키기 위해 provider를 이용한다.
import { Provider } from 'react-redux';


import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducer';

import 'antd/dist/antd.css';

// 리덕스에서 가져온 applymiddleware.
// 미들웨어들을 사용하기 위한 과정.
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk )(createStore);

ReactDOM.render(
  <Provider // 리덕스 연결 위한 provider, 
    // 위에 만든 스토어를 store에 넣어줌.
    store = {createStoreWithMiddleware(Reducer,
      // 리덕스 확장 프로그램. 리덕스를 좀더 편하게 사용 가능.
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
