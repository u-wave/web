import find from 'array-find';

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
  const link = type => {
    const match = /^https?:\/\/[\S]+/.exec(chunk);
    if (match) {
      tokens.push(new Token(type, chunk.slice(0, match[0].length)));
      i += match[0].length;
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
      mention('@', 'mention') ||
      link('link');
    if (!found) {
      let end = chunk.indexOf(' ', 1) + /* eat space */ 1;
      if (end === 0) { // no match, = -1 + 1
        end = chunk.length;
      }
      // append to previous token if it was also a word
      if (tokens.length > 0 && tokens[tokens.length - 1].type === 'word') {
        tokens[tokens.length - 1].text += chunk.slice(0, end);
      } else {
        tokens.push(new Token('word', chunk.slice(0, end)));
      }
      i += end;
    }
    space();
    chunk = text.slice(i);
  }
  return tokens;
}

// Parses a chat message into a tree-ish structure.
// Options:
//  * users: User objects that can be mentioned.
function parse(message, opts) {
  const { users } = opts;
  return tokenize(message).map(token => {
    switch (token.type) {
    case 'italic':
      return { type: 'italic', content: parse(token.text, opts) };
    case 'bold':
      return { type: 'bold', content: parse(token.text, opts) };
    case 'code':
      return { type: 'code', content: [ token.text ] };
    case 'strike':
      return { type: 'strike', content: parse(token.text, opts) };
    case 'mention':
      const mention = users && find(users, user => user.username === token.text);
      return mention
        ? { type: 'mention', user: mention }
        : token.raw;
    case 'link':
      return { type: 'link', text: token.text, href: token.text };
    default:
      return token.text;
    }
  });
}

export default parse;
