import mentionSoundUrl from '../../assets/audio/mention.mp3';

let mentionSound;
if (typeof window !== 'undefined' && window.Audio) {
  mentionSound = new window.Audio(mentionSoundUrl);
}

export default function playMentionSound() {
  if (mentionSound) {
    mentionSound.play();
  }
}
