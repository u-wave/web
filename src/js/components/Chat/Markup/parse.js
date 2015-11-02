import find from 'array-find';
import React from 'react';
import UserStore from '../../../stores/UserStore';

import Bold from './Bold';
import Code from './Code';
import Italic from './Italic';
import StrikeThrough from './StrikeThrough';
import Mention from './Mention';

function Token(type, text, raw = text) {
  this.type = type;
  this.text = text;
  this.raw = raw;
}

function tokenize(text) {
  let chunk;
  let i = 0;
  const tokens = [];
  // adds a token of type `type` if the current chunk starts with
  // a `delim`-delimited string
  const delimited = (delim, type) => {
    if (chunk[0] === delim && chunk[1] !== delim) {
      const end = chunk.indexOf(delim, 1);
      if (end !== -1) {
        tokens.push(new Token(type, chunk.slice(1, end)));
        i += end + 1;
        return true;
      }
    }
  };
  const mention = (start, type) => {
    if (chunk[0] === start) {
      let end = chunk.indexOf(' ');
      if (end === 1) {
        return false;
      }
      if (end === -1) {
        end = chunk.length;
      }
      tokens.push(new Token(type, chunk.slice(1, end), chunk.slice(0, end)));
      i += end;
      return true;
    }
  };
  // eat spaces
  const space = () => {
    // .slice again because `i` changed
    const m = /^\s+/.exec(text.slice(i));
    if (m) {
      tokens.push(new Token('word', m[0]));
      i += m[0].length;
    }
  };
  // tokenize text, just loop until it's done!
  chunk = text;
  while (chunk) {
    const found =
      delimited('_', 'italic') ||
      delimited('*', 'bold') ||
      delimited('`', 'code') ||
      delimited('~', 'strike') ||
      mention('@', 'mention');
    if (!found) {
      let end = chunk.indexOf(' ', 1) + /* eat space */ 1;
      if (end === 0) {// no match, = -1 + 1
        end = chunk.length;
      }
      tokens.push(new Token('word', chunk.slice(0, end)));
      i += end;
    }
    space();
    chunk = text.slice(i);
  }
  return tokens;
}

function parse(message) {
  const users = UserStore.getUsers();
  return tokenize(message).map((tok, i) => {
    switch (tok.type) {
    case 'italic':
      return <Italic key={i}>{parse(tok.text)}</Italic>;
    case 'bold':
      return <Bold key={i}>{parse(tok.text)}</Bold>;
    case 'code':
      return <Code key={i}>{tok.text}</Code>;
    case 'strike':
      return <StrikeThrough key={i}>{parse(tok.text)}</StrikeThrough>;
    case 'mention':
      const mention = find(users, user => user.username === tok.text);
      return mention
        ? <Mention key={i} user={mention} />
        : tok.raw;
    default:
      return tok.text;
    }
  });
}

export default parse;
