import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm } from '../../modules/auth';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth }) => ({
        form: auth.login
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
    }

    //컴포넌트 처음 렌더링될 때 폼 초기화
    useEffect(() => {
        dispatch(initializeForm('login'))
    }, [dispatch])

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default LoginForm;