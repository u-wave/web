import { receive } from '../actions/ChatActionCreators';

const usernames = 'Hank, Joanna, Kris, Tom, Kim'.split(', ');
const messages = [
  // https://en.wikipedia.org/wiki/List_of_linguistic_example_sentences
  'In port, the portly porter ported the port, through the port port.',
  'Will Will will Will\'s will to Will?',
  'Time flies like an arrow; fruit flies like a banana',
  'Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo.',
  'Rose rose to put rose roes on her rows of roses.',
  'James while John had had had had had had had had had had had a better effect on the teacher',
  'That that is is that that is not is not is that it it is',
  'If it is it, it is it. If it is, it is it, it is!',
  'A ship-shipping ship shipping shipping ships.',
  'He jarred ajar a jar of Jar-Jar\'s jarred charred chard and char giardiniera.',
  'That that exists exists in that that that that exists exists in.',
  'Can can can can can can can can can can.',
  'Police police police police police police police police',
  'I saw the man with the binoculars.',
  'They are hunting dogs.',
  'Free whales.',
  'Police help dog bite victim.',
  'He saw that gas can explode.',
  'Turn right here...',
  'We saw her duck.',
  'One morning I shot an elephant in my pajamas. How he got in my pajamas, I don\'t know.',
  'Ship sails tomorrow.',
  'Book stays in London.',
  'Wanted: a nurse for a baby about twenty years old.',
  'The girl in the car that needed water is waiting.',
  'Did you ever hear the story about the blind carpenter who picked up his hammer and saw?',
  'Those prosecutors have been trying to lock him up for ten years.',
  'Flying planes can be dangerous.',
  'I once saw a deer riding my bicycle.',
  'Look at the dog with one eye.'
];

let _id = 0;

export function connect() {
  setTimeout(function n() {
    receive({
      id: _id++,
      username: usernames[Math.floor(Math.random() * usernames.length)],
      text: messages[Math.floor(Math.random() * messages.length)]
    });
    setTimeout(n, Math.floor(Math.random() * 2000));
  }, 500);
}
