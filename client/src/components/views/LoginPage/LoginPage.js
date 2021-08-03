import React, {useState} from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'

function LoginPage(props) {


    const dispatch = useDispatch();

    // 안에서 데이터를 변화시키기 위해선 state를 사용
    // email을 위한 state와 password를 위한 state 둘 다 필요함
    // 타이핑을 할 때 state를 바꾸면 밸류가 바뀜. onchange 발동,
    // 

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        // 이거 없으면 페이지가 계속 리프레시 됨
        event.preventDefault();

        // body에 이메일과 비밀번호를 담아서
        let body = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/')
                } else{
                    alert('Error');
                }
            })

        

    }

    return (
        <div style = {{ 
            display : 'flex', justifyContent : 'center',
            alignItems : 'center', width : '100%', height : '100vh' 
            }}>
            <form style = {{ display : 'flex', flexDirection : 'column'}}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>

                <input type = "email" value = {Email} onChange ={onEmailHandler} />
                <label>Password</label>
                <input type = "password" value = {Password} onChange ={onPasswordHandler}/>
                <br />
                <button type = "submit">
                    Login
                </button>


            </form>
        </div>
    )
}

export default withRouter(LoginPage)
