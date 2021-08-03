import axios from 'axios';
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null)
{
    // option
    // null     => 아무나 출입 가능
    // true     => 로그인한 유저만 출입 가능
    // false    => 로그인한 유저는 출입 불가능

    function AuthenticationCheck(props)
    {
        // 백엔드로 리퀘스트를 날려서 그 사람의 현재 상태를 가져옴.
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response);

                
                if(!response.payload.isAuth)
                {
                    // 로그인 하지 않은 상태
                    if(option)
                    {
                        props.history.push('/login');
                    }
                }else
                {
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin)
                    {
                        props.history.push('/');
                    }else
                    {
                        if(!option)
                            props.history.push('/');
                    }

                }


            });

            //axios.get('/api/users/auth')
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}