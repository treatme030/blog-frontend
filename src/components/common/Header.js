import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

// Responsiv 컴포넌트에 스타일 추가하여 새로운 컴포넌트 생성
const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right {
        display: flex;
        align-items: center;
    }
`;

//헤더가 fixed이므로 4rem 아래에 콘텐츠가 나타나도록 해 주는 컴포넌트
const Spacer = styled.div`
    height: 4rem;
`;

//계정명
const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

const Header = ({ user }) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/" className="logo">REACTERS</Link>
                    {user ? (
                        <div className="right">
                            <UserInfo>{user.username}</UserInfo>
                            <Button>로그아웃</Button>
                        </div>
                    ) : (
                        <div className="right">
                            <Button to="/login">로그인</Button>
                        </div>
                    )}

                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};

export default Header;