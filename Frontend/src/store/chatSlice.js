import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    activeChatId: null,
    isSending: false,
    input: ''
  },
  reducers: {
    setChats(state, action) {
      state.chats = action.payload;
    },
    startNewChat(state, action) {
      state.chats.unshift(action.payload);
      state.activeChatId = action.payload._id;
    },
    selectChat(state, action) {
      state.activeChatId = action.payload;
    },
    deleteChat(state, action) {
      const chatId = action.payload;
      state.chats = state.chats.filter(c => c._id !== chatId);
      if (state.activeChatId === chatId) state.activeChatId = null;
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    sendingStarted(state) { state.isSending = true; },
    sendingFinished(state) { state.isSending = false; }
  }
});

export const { setChats, startNewChat, selectChat, deleteChat, setInput, sendingStarted, sendingFinished } = chatSlice.actions;
export default chatSlice.reducer;