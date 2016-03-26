## play-audio

Lightweight Wrapper For HTML5 Audio API

```js
play = require('play-audio')

play('song.mp3').autoplay()
```

* Example 1: [Playing An Alert Sound](http://requirebin.com/?gist=6050020)
* Example 2: [Music player](http://requirebin.com/?gist=6049983)
* Example 3: [alert library](http://github.com/azer/alert)

## Install

```bash
$ npm install play-audio
```

## Browser Compatibility

```js
play(['song.mp3', 'song.ogg']).play()
```

## Displaying Controls

```js
parent = document.querySelector('.my-player')
play(['song.mp3', 'song.ogg'], parent).autoplay.controls()
```

## How to use without NPM?

If your application isn't structured as a CommonJS package, you can download the distribution file;

```bash
$ wget https://raw.github.com/azer/play-audio/master/dist/play-audio.js
```

And include it on your page:

```html
<script src="play-audio.js"></script>
<script>
  playAudio(['song.mp3', 'song.ogg'])
</script>
```

## Changing Source After Initialization

```js
p = play(['song.mp3', 'song.ogg']).autoplay()
p.src()
// => ['song.mp3', 'song.ogg']

p.src(['new.mp3', 'new.ogg']).play()
p.src()
// => ['new.mp3', 'new.ogg']
```

## API

Example:

```js
play('foo.mp3').volume(0.3).controls().loop().on('ended', function(){
  console.log('End of the song reached')
})
```

Reference:

* play(uri, parentElement)
* .controls
* .currentTime
* .element
* .loop
* .muted
* .on(event, function)
* .pause
* .play
* .preload
* .src(url)
* .volume(number)

## Events

* abort
* durationchange
* ended
* error
* pause
* play
* progress
* timeupdate

[See complete reference](http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#mediaevents)
