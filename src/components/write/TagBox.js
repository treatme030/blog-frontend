import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
    padding-top: 2rem;
    h4 {
        color: ${palette.gray[8]};
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`;

const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 256px;
    border: 1px solid ${palette.gray[9]};
    input,
    button {
        outline: none;
        border: none;
        font-size: 1rem;
    }
    input {
        padding: 0.5rem;
        flex: 1;
        min-width: 0;
    }
    button {
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        background: ${palette.gray[8]};
        color: white;
        font-weight: bold;
        &:hover {
            background: ${palette.gray[6]};
        }
    }
`;

const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

const TagListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

//React.memo 사용해서 tag 값이 변경시에만 리렌더링되도록 처리
//input 값이 바뀌어도 TagList 컴포넌트가 리렌더링 되지 않음 
const TagItem = React.memo(({ tag, onRemove }) => (
    <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
))
const TagList = React.memo(({ tags, onRemove }) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag} tag={tag} onRemove={onRemove} />
        ))}
    </TagListBlock>
))

const TagBox = ({ onChangeTags, tags }) => {
    const [input, setInput] = useState('')
    const [localTags, setLocalTags] = useState([])

    //tag 추가 
    const insertTag = useCallback(
        tag => {
            if (!tag) { //공백이라면 추가하지 않음
                return;
            }
            if (localTags.includes(tag)) { //이미 존재하는 tag라면 추가하지 않음
                return;
            }
            const nextTags = [...localTags, tag]
            setLocalTags(nextTags)
            onChangeTags(nextTags)
        },
        [localTags, onChangeTags]
    )

    //tag 제거
    const onRemove = useCallback(
        tag => {
            const nextTags = localTags.filter(t => t !== tag)
            setLocalTags(nextTags)
            onChangeTags(nextTags)
        },
        [localTags, onChangeTags]
    )

    const onChange = useCallback(e => {
        setInput(e.target.value)
    }, [])

    const onSubmit = useCallback(e => {
        e.preventDefault()
        insertTag(input.trim()) // 앞뒤 공백을 없앤 후 등록
        setInput('')
    }, [input, insertTag])

    useEffect(() => {
        setLocalTags(tags)
    }, [tags])

    return (
        <TagBoxBlock>
            <h4>tag</h4>
            <TagForm onSubmit={onSubmit}>
                <input
                    placeholder="태그를 입력하세요."
                    value={input}
                    onChange={onChange}
                />
                <button type="submit">추가</button>
            </TagForm>
            <TagList tags={localTags} onRemove={onRemove} />
        </TagBoxBlock>
    );
};

export default TagBox;