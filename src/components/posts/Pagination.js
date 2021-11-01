import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
`;

const PageNumber = styled.div``;

const buildLink = ({ username, tag, page }) => {
    const query = qs.stringify({ tag, page })
    return username ? `/@${username}?${query}` : `/?${query}`;
}

const Pagination = ({ page, username, tag, lastPage }) => {
    return (
        <PaginationBlock>
            <Button
                disabled={page === 1}//첫 페이지일 때 이전 버튼 비활성화
                to={
                    page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
                }
            >
                이전
            </Button>
            <PageNumber>{page}</PageNumber>
            <Button
                disabled={page === lastPage}//마지막 페이지일 때 다음 버튼 비활성화
                to={
                    page === lastPage ? undefined : buildLink({ username, tag, page: page + 1 })
                }
            >
                다음
            </Button>
        </PaginationBlock>
    );
};

export default Pagination;