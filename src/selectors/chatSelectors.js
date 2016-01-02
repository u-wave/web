import { createSelector, createStructuredSelector } from 'reselect';

const baseSelector = state => state.chat;

const messagesSelector = createSelector(baseSelector, chat => chat.messages);

export const chatSelector = createStructuredSelector({
  messages: messagesSelector
});
