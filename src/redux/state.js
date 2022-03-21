let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 12 },
        { id: 2, message: "Guitar HERO!!", likeCount: 25 },
        { id: 3, message: "It's my second post", likeCount: 11 },
        { id: 4, message: "It's my first post", likeCount: 16 }
      ],
      newPostText: 'You text'
    },
    dialogsPage: {
      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Hello' },
        { id: 5, message: 'Where you?' },
        { id: 6, message: 'How much?' },
      ],
      dialogs: [
        { id: 1, name: 'Ihor' },
        { id: 2, name: 'Sveta' },
        { id: 3, name: 'Viktor' },
        { id: 4, name: 'Andrey' },
        { id: 5, name: 'Katya' },
        { id: 6, name: 'Valery' },
      ]
    }
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log('Swew');
  },
  addPost() {
    let newPost = {
      id: 5,
      message: this._state.profilePage.newPostText,
      likeCount: 0
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = '';
    this._callSubscriber(this._state);
  },
  updateNewPostText(newText) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(this._state);
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  }
}

  export default store;
  window.store = store;