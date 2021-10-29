import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, login } from '../../modules/auth';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom'


const LoginForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }))

    const onChange = e => {
        const { value, name } = e.target
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        )
    }

    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({ username, password }));
    }

    //컴포넌트 처음 렌더링될 때 폼 초기화
    useEffect(() => {
        dispatch(initializeForm('login'))
    }, [dispatch])

    useEffect(() => {
        if (authError) {
            console.log('error')
            console.log(authError)
            setError('로그인 실패')
            return;
        }
        if (auth) {
            console.log('success')
            dispatch(check())
        }
    }, [auth, authError, dispatch])

    useEffect(() => {
        if (user) {
            history.push('/')
            try {
                //로그인 상태 유지하기, 브라우저에 내장되어 있는 localStorage 사용
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user])

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);