import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, register } from '../../modules/auth';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom'

const RegisterForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }))

    const onChange = e => {
        const { value, name } = e.target
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        )
    }

    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        //입력값이 하나라도 비어 있다면,
        if ([username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요.')
            return;
        }
        //비밀번호가 일치하지 않는다면,
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.')
            //비밀번호 입력칸 초기화
            dispatch(changeField({ form: 'register', key: 'password', value: '' }))
            dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }))
            return;
        }
        dispatch(register({ username, password }));
    }

    //컴포넌트 처음 렌더링될 때 폼 초기화
    useEffect(() => {
        dispatch(initializeForm('register'))
    }, [dispatch])

    //회원가입 성공, 실패
    useEffect(() => {
        if (authError) {
            //계정이 이미 존재한다면,
            if (authError.response.status === 409) {
                setError('이미 존재하는 계정입니다.')
                return;
            }
            setError('회원가입 실패')
            return;
        }
        if (auth) {
            console.log('회원가입 성공');
            console.log(auth)
            dispatch(check())
        }
    }, [auth, authError, dispatch])

    //user 값이 잘 설정되었는지 확인 
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
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);