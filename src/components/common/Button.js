import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;
    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]};
    }
    &:disabled {
        background: ${palette.gray[3]};
        color: ${palette.gray[5]};
        cursor: not-allowed;
    }

    ${props => props.fullWidth &&
        css`
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        width: 100%;
        font-size: 1.125rem;
    `}

    ${props => props.cyan &&
        css`
        background: ${palette.cyan[5]};
        &:hover {
            background: ${palette.cyan[4]};
        }
    `}
`;

const StyledButton = styled.button`
    ${buttonStyle}
`;

const StyledLink = styled(Link)`//styled()함수 사용
    ${buttonStyle}
`;


const Button = (props) => {
    return props.to ? (
        //styled() 함수로 감싸서 만든 컴포넌트의 경우 cyan과 같은 임의 props는 필터링되지 않음
        //필터링되지 않으면 cyan={true} 값이 Link에서 사용하는 a태그로 그대로 전달되는데
        //a태그 boolean 값이 임의 props로 설정되는 것 허용 안하고, 숫자와 문자열만 허용해서
        //boolean을 숫자로 변환
        <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
    ) : (
        <StyledButton {...props} />
    )
};

export default Button;