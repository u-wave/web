const mentionSoundUrl = new URL('../../assets/audio/mention.mp3', import.meta.url);

let mentionSound;
if (typeof window !== 'undefined' && window.Audio) {
  mentionSound = new window.Audio(mentionSoundUrl);
}

export default function playMentionSound() {
  if (mentionSound) {
    mentionSound.play();
  }
}
