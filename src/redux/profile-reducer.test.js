import profileReducer, { addPostActionCreater, deletePost } from "./profile-reducer";
import React from 'react';

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 12 },
        { id: 2, message: "Guitar HERO!!", likeCount: 25 },
        { id: 3, message: "It's my second post", likeCount: 11 },
        { id: 4, message: "It's my first post", likeCount: 16 }
    ]
};
test('length of posts should be incremented', () => {
    // test data
    let action = addPostActionCreater('React best');
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts.length).toBe(5);
  });
test('message of new post should be correct', () => {
    // test data
    let action = addPostActionCreater('React best');
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts[4].message).toBe('React best');
  });
test('after deleting length of message should be decrement', () => {
    // test data
    let action = deletePost(1);
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts.length).toBe(3);
  });
test(`after deleting length shouldn't be decrement if id is uncorrect`, () => {
    // test data
    let action = deletePost(1000);
    // action
    let newState = profileReducer(state, action);
    // expectation
    expect(newState.posts.length).toBe(4);
  });
