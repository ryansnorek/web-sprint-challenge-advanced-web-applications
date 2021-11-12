import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import { render, screen } from '@testing-library/react';

const article = {
      id: 1,
      headline: "doofy graduates lambda",
      createdOn: "today",
      author: "doofys caretaker",
      image: 134,
      summary: "doofy graduated lambda with flying colors",
      body: "after a long 6 months and 37 flexes, doofy is awarded a completion certificate"   
}

test('renders component without errors', () => {
    const f = jest.fn();
    render(<Article article={article} handleDelete={f} handleEditSelect={f}/>);
});

test('renders headline, author from the article when passed in through props', () => {
    const f = jest.fn();
    const { queryByTestId } = render(<Article article={article} handleDelete={f} handleEditSelect={f}/>);
    const headline = queryByTestId("headline");
    const author = queryByTestId("author");
    const summary = queryByTestId("summary");
    const body = queryByTestId("body");
    expect(headline.textContent).toBe(article.headline);
    expect(author.textContent).toBe(`By ${article.author}`);
    expect(summary.textContent).toBe(article.summary);
    expect(body.textContent).toBe(article.body);
});

test('renders "Associated Press" when no author is given', () => {
    article.author = "";
    const f = jest.fn();
    render(<Article article={article} handleDelete={f} handleEditSelect={f}/>);
    const author = screen.queryByTestId("author");
    expect(author.textContent).toBe("By Associated Press");
});

test('executes handleDelete when the delete button is pressed', () => {
    const f = jest.fn();
    const handleDelete = jest.fn();
    render(<Article article={article} handleDelete={handleDelete} handleEditSelect={f}/>);
    const deleteButton = screen.queryByTestId("deleteButton");
    userEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
});