import { expect } from 'chai';
import parseChatMarkup from '../src/utils/parseChatMarkup';

describe('utils/parseChatMarkup', () => {
  const bareOptions = {};

  describe('simple markup', () => {
    it('bolds things surrounded by *', () => {
      expect(parseChatMarkup('some *bold* text', bareOptions)).to.eql([
        'some ',
        { type: 'bold', content: [ 'bold' ] },
        ' text'
      ]);
    });
    it('italicizes things surrounded by _', () => {
      expect(parseChatMarkup('some _italic_ text', bareOptions)).to.eql([
        'some ',
        { type: 'italic', content: [ 'italic' ] },
        ' text'
      ]);
    });
    it('strikes through things surrounded by ~', () => {
      expect(parseChatMarkup('some ~stroke~ text', bareOptions)).to.eql([
        'some ',
        { type: 'strike', content: [ 'stroke' ] },
        ' text'
      ]);
    });

    it('does not parse simple markup in the middle of words', () => {
      expect(parseChatMarkup('underscored_words are fun_!', bareOptions)).to.eql([
        'underscored_words are fun_!'
      ]);
    });

    it('does not parse incomplete markup', () => {
      expect(parseChatMarkup('a * b', bareOptions)).to.eql([
        'a * b'
      ]);
    });

    it('parses nested markup', () => {
      expect(parseChatMarkup('*bold _italic_*', bareOptions)).to.eql([
        { type: 'bold', content: [
          'bold ',
          { type: 'italic', content: [ 'italic' ] }
        ] }
      ]);
    });
  });

  describe('code blocks', () => {
    it('parses inline code blocks', () => {
      expect(parseChatMarkup('some `monospace` text', bareOptions)).to.eql([
        'some ',
        { type: 'code', content: [ 'monospace' ] },
        ' text'
      ]);
    });

    it('parses code blocks inside other markup', () => {
      expect(parseChatMarkup('*_`monospace`_*', bareOptions)).to.eql([
        { type: 'bold', content: [
          { type: 'italic', content: [
            { type: 'code', content: [ 'monospace' ] }
          ] }
        ] }
      ]);
    });

    it('does not parse markup inside code blocks', () => {
      expect(parseChatMarkup('a `b *c* _d_` e', bareOptions)).to.eql([
        'a ',
        { type: 'code', content: [ 'b *c* _d_' ] },
        ' e'
      ]);
    });
  });
});
