import React from 'react'
import { useDispatch } from 'react-redux'
import {  useState } from "react";
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

    // 안에서 데이터를 변화시키기 위해선 state를 사용
    // email을 위한 state와 password를 위한 state 둘 다 필요함
    // 타이핑을 할 때 state를 바꾸면 밸류가 바뀜. onchange 발동,
    // 

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Password, setPassword] = useState("");
    
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        // 이거 없으면 페이지가 계속 리프레시 됨
        event.preventDefault();

        if(Password !== ConfirmPassword)
        {
            return alert('비밀번호가 같지 않습니다.');
        }

        // body에 이메일과 비밀번호를 담아서
        let body = {
            name : Name,
            email : Email,
            password : Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success)
                {
                    props.history.push("/login");
                }
                else{
                    alert("failed to signup");
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
                <label>Name</label>
                <input type = "text" value = {Name} onChange ={onNameHandler}/>
                <label>Password</label>
                <input type = "password" value = {Password} onChange ={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type = "password" value = {ConfirmPassword} onChange ={onConfirmPasswordHandler}/>
                
                <br />
                <button type = "submit">
                    회원가입
                </button>


            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
