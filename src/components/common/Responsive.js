import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
    margin: 0 auto;

    /* 브라우저 크기에 따라 가로 크기 변경 */
    @media (max-width: 1024px){
        width: 768px;
    }
    @media (max-width: 768px){
        width: 100%;
    }
`;

//...rest를 통해서 모든 props 사용할 수 있도록 
const Responsive = ({ children, ...rest }) => {
    return (
        <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
    );
};

export default Responsive;