# 1.0.0-beta.16 / 25 Aug 2017

Features:

 * Add `title` option to configure page title. (#730)
 * Implement password reset app. Requires u-wave-api-v1@0.3.0. (#732)

Bugfixes:

 * Fix waitlist part of ETA. (#729)
 * Fix locale import paths in `lib/` and `es/` builds. (#731)

# 1.0.0-beta.15 / 19 Aug 2017

Features:

 * Add Spanish translation by @GameOver1751. (#699)
 * New chat commands: `/volume`, `/mute`, `/unmute`, `/nick`, `/upvote`, `/downvote`. (#723)
 * Only send name change request if new name is different. (#728)

Bugfixes:

 * Remove ? from HTTP requests without query parameters. (#706)
 * Fix interpolation in chat notifications. (#717)
 * Wait for locale to be loaded before rendering anything. (#721)

Internal:

 * Use `format-duration` module. (#702, #703)
 * Extract SearchBar component. (#708)
 * Lots of dependency updates.

# 1.0.0-beta.14 / 09 Jul 2017

Features:

 * Add user join, leave, name change notifications. (#681)
 * Add loading spinner to and move reload into shuffle operation. (#691)
 * Support WebSocket keepalive messages. (#696)
 * Enable source maps in production. (#697)

Bugfixes:

 * Fix progress bar animation in prod build. (#682)
 * Remember playlist item selection as new pages are loaded. (#684)

Internal:

 * Switch to babel-preset-env. (#566)
 * Move `playMentionSound` into util module. (#687)
 * Make overlays standalone components, not tied to `<Overlay/>`. (#688)
 * Development server: Auto-reload Web API on changes. (#698)

# 1.0.0-beta.13 / 23 Jun 2017

Features:

 * Improve progress bar animation. (#672)

Bugfixes:

 * Hide import panels on error. (#674)

Internal:

 * Use an `<img>` for emoji. (#673)
 * Enable ModuleConcatenationPlugin with Webpack v3. (#676)
 * Test doing a full prod build on CI. (#678)

# 1.0.0-beta.12 / 09 Jun 2017

Features:

 * Add a loading spinner to the skip button. (#660)
 * Resync time if the local clock changes unexpectedly. (#661)
 * Lazy load all non-English locales. (#609)

Bugfixes:

 * Room History style fixes. (#655)
 * Fix entering fullscreen mode. (#659)
 * Fix JS error on logout. (#663)

Internal:

 * Add explicit dependency on es2015-modules-commonjs transform. (27199551ec131448ad9fd3454aaf9308b289f053)
 * Remove old experimental plugin file code. (#662)
 * Fix deprecation warnings during tests. (#664)
 * Extract MediaThumbnail component. (#665)
 * Use a unique key for media list rows to minimize updates while scrolling. (#637)
 * Add Node 8 to CI. (#666)
 * Auto-update lockfile w/ greenkeeper. (#668)

# 1.0.0-beta.11 / 27 May 2017

Bugfixes:

 * Fix the Video toolbar position. (#652)

# 1.0.0-beta.10 / 26 May 2017

Features:

 * Use a material-ui-like loading spinner. (#610)
 * Default to `https://sigil.u-wave.net` avatars. (#611)
 * Add Privacy Policy checkbox to register form. (#614)
 * Automatically close media source picker after selecting a source. (#627)
 * Batch rerenders into a `requestAnimationFrame`. (#629)
 * Allow pausing YouTube videos in Preview mode. (#636)
 * Wait for the initial state before rendering. (#649)

Bugfixes:

 * Truncate long song names in SoundCloud card. (#613)
 * Fix logo size on the privacy policy page. (#615)

Internal:

 * Dependency upgrades (especially React, material-ui)
 * Switch to a different YouTube component that handles state internally. (#590)
 * Small `serve` task cleanup. (#619)
 * Show more helpful Redis/Mongo connection errors. (#622)
 * Flatten invalid nested CSS selectors. (#642)

# 1.0.0-beta.9 / 15 Apr 2017

Features:

 * Use larger placeholder while dragging users in the waitlist. (#604)

Bugfixes:

 * Hide chat message input when logged out. (#597)

Internal:

 * Add a testing setup for React components. (#539)
 * Upgrade React to v15.5 and deal with deprecations. (#600)
 * Upgrade dependencies.

# 1.0.0-beta.8 / 17 Mar 2017

Features:

 * Use React to generate SVG video backdrop. (#562)
 * Show "Back To Recent Messages" button when scrolled up in chat. (#564)
 * Add static page compilation and a Privacy Policy page. (#570)
 * Show cached playlist items when switching playlists, instead of waiting
   for the playlist to reload. (#571)
 * Add Skip reason selector. (#573)

Bugfixes:

 * Fix chat scrolling up by itself after resizing the window. (#564)

Internal:

 * Change user settings button to an actual `<button />`. (#575)
 * Use `import` everywhere. (#576)
 * Upgrade dependencies.

# 1.0.0-beta.7 / 24 Feb 2017

Features:

  * Add the Password Reset Request form. (#264)

Bugfixes:

  * Fix playlist rename dialog title. (#556)
  * Fix deleting chat messages. (#559)
  * Resolve HTTP requests with return value from onComplete, fixes favoriting
    media into a new playlist. (#560)
  * Fix user cards overflowing window boundary. (#561)

Internal:

  * Pull more build things from Gulp tasks into Webpack config. (#558)

# 1.0.0-beta.6 / 17 Feb 2017

Features:

  * Sort emoji autocomplete suggestions by length. (#544)
  * Use ReCaptcha's Dark theme. (#552)
  * Add button to swap artist/title in EditMediaDialog. (#553)

Bugfixes:

  * Chat performance fixes. (#543)

Internal:

  * Add Lodash Webpack plugin. (#512, #549)
  * Always render VideoBackdrop regardless of current media source. (#550)

# 1.0.0-beta.5 / 28 Jan 2017

This release contains an important fix for renaming playlists, and some minor fixes.

Bugfixes:

 * Fix chat timestamps appearing behind emoji. (#533)
 * Fix squeezed display of non-square emoji in suggestions list. (#535)
 * Fix playlist meta actions. (#538)

Internal:

 * Deal a bit better with missing browser features. (#518)

# 1.0.0-beta.4 / 22 Jan 2017

Features:

  * Add a Delete button to individual chat messages for moderators (#489)
  * Add Material-UI touch ripple when switching tabs (#508)

Bugfixes:

  * Use cross-env for npm build script environment variables on Windows (#511)
  * Remove Forgot Password link pending the related PR #264 (#531)

Internal:

  * Add react-inline-elements transform in production build. (#503)
  * Split up playlist manager into several separate Redux containers (#504)
  * Clean up some dead code (#516, #523)
  * Update Babel preset to use `babel-preset-latest` (#520)
  * Split up chat messages list and input into separate Redux containers (#521)

# 1.0.0-beta.3 / 26 Nov 2016

Bugfixes:

  * Auto-position emoji tooltips to prevent overflow in chat messages (#495)
  * Fix emoji in development watch mode (#496)
  * Fix username dialog sizing (#498)

# 1.0.0-beta.2 / 22 Nov 2016

Features:

  * Add a configurable About page overlay. Use
    `uw.setAboutPageComponent(class extends React.Component)` to change the
    contents of the overlay.
  * Add a video toolbar that shows when hovering the video area. The toolbar
    contains buttons to toggle Small Video mode and a new Fullscreen mode. Media
    sources can export a source-specific `VideoTools` component that will be
    rendered into the toolbar when media from that source is playing.
  * Publish ES-modules formatted code in es/ folder. Publish translations as JS
    files so a yaml plugin is not required for custom builds.

Improvements:

  * Speed up rendering new chat messages by about 5× or more, depending on the
    size of the chat history.
  * Disable vote buttons when nobody is DJ-ing.
  * Compress images.

Bugfixes:

  * ReconnectingWebSocket no longer crashes when imported from Node.js.
  * The user list and wait list now properly fill the entire side panel.

Internal:

  * Move build system to Webpack. CSS can now be hot-reloaded, and JS reloading
    is a lot more robust.
  * Upgrade dependencies.
  * Inline ReconnectingWebSocket dependency.
  * Remove postcss-bem plugin, instead only using cssnext for CSS features.
    The postcss-bem project is abandoned.

# 1.0.0-beta.1 / 02 Nov 2016

Start tracking changes.
