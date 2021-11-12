import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import articleService from '../services/articleServices';
import axiosWithAuth from '../utils/axiosWithAuth';

import Article from './Article';
import EditForm from './EditForm';

const View = props => {
    const [articles, setArticles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState();

    useEffect(() => {
        articleService()
            .then(res => setArticles(res))
            .catch(err => console.error(err));
    },[]);

    const handleDelete = id => {
        axiosWithAuth()
            .delete(`/articles/${id}`)
            .then(res => setArticles(res.data))
            .catch(err => console.error(err));
    };

    const handleEdit = article => {
        axiosWithAuth()
            .put(`/articles/${article.id}`, article)
            .then(res => {
                setArticles(res.data);
                setEditing(false);
            })
            .catch(err => console.error(err));
    };
    
    const handleEditSelect = id => {
        setEditing(true);
        setEditId(id);
    };

    const handleEditCancel = () => setEditing(false);

    return(<ComponentContainer>
        <HeaderContainer>View Articles</HeaderContainer>
        <ContentContainer flexDirection="row">
            <ArticleContainer>
                {
                    articles.map(article => {
                        return <ArticleDivider key={article.id}>
                            <Article key={article.id} article={article} handleDelete={handleDelete} handleEditSelect={handleEditSelect}/>
                        </ArticleDivider>
                    })
                }
            </ArticleContainer>
            
            {
                editing && <EditForm editId={editId} handleEdit={handleEdit} handleEditCancel={handleEditCancel}/>
            }
        </ContentContainer>
    </ComponentContainer>);
}

export default View;


const Container = styled.div`
    padding: 0.5em;
`
const HeaderContainer = styled.h1`
    border-bottom: solid black 2px;
    padding: 1em;
    margin:0;
    font-size: 1.5em;
    background: black;
    color: white;
`

const ArticleDivider = styled.div`
    border-bottom: 1px solid black;
    padding: 1em;
    background: rgb(126, 87, 126);
`

const ComponentContainer = styled.div`
    display:flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
`

const ArticleContainer = styled.div`
    background: grey;
`;