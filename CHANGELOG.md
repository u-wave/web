# u-wave-web change log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

# 1.8.2 / 24 May 2018
Features:
 * Enable mobile vote button area once media is playing. (#919)

Bugfixes:
 * Fix playlist names overflowing in mobile AddToPlaylistMenu. (#918)
 * Fix desktop preload check. (#940)

Internal:
 * Add Webpack bundle analyzer script. (#939)
 * Split some of the hacky webpack parts into separate files (#942)
 * Upgrade redux to v4.0.0 and react-dnd to v3.0.0. (#920)
 * Upgrade material-ui to v1.0.0.

# 1.8.1 / 30 Apr 2018

Bugfixes:
 * Disable vertical padding in user and playlist lists. (#910)
 * Prevent playlist name wrapping on narrow screens. (#911)
 * Link to u-wave.net instead of github. (#914)
 * Fix crash when no media is playing on mobile. (#916)
 * Fix mobile UsersDrawer docking to the left. (#917)

Internal:
 * Upgrade material-ui to v1.0.0-beta.44.

# 1.8.0 / 26 Apr 2018

Features:
 * Show a message if a search turned up no results. (#889)

Bugfixes:
 * Fix width of mobile SoundCloud player and add the blurred backdrop. (#893)
 * Fix menu size on mobile with very long playlist names. (#895)
 * Fixes for playlist "Active" checkbox. (#909)

Internal:
 * Fix server list sizing. (#891)
 * Use a material-ui IconButton for the overlay close button. (#892)
 * Move SearchResults panel to its own folder. (#894)
 * Update material-ui to v1.0.0-beta.43. (a21a96e3)
 * Wait until the page is fully loaded before preloading overlays. (7ba34cb8)

# 1.7.0 / 19 Apr 2018

Features:
 * Show error message if SoundCloud track cannot be loaded. (#819)
 * Play media on full volume on mobile. (#879)
 * Request user interaction if SoundCloud autoplay is blocked. (#885)

Internal:
 * Small refactors in the dev server.
 * Dependency updates.
 * Use an HTML form for the MOTD update UI. (#877)
 * Use material-ui IconButtons for media actions. (#882)
 * Preload overlays on desktop. (#887)

# 1.6.0 / 15 Apr 2018

Features:
 * Add pagination and filtering to user administration page. (#870)

Bugfixes:
 * Wait for recaptcha response before enabling Register button. (#876)
 * Fix theme related crash on password reset page. (#871)
 * Fix ResponseButtons not covering the full FooterBar height. (#868)
 * Allow focusing chat when PreviewMediaDialog is open. (#867)

Internal:
 * Fix @babel/runtime useBuiltIns configuration. (#874)
 * Lazy overlays for the mobile layout. (#875)
 * Lazy load overlay code. (#873)
 * Split lots of chunks. (#872)
 * Replace some components with material-ui versions. (#869)

# 1.5.0 / 13 Apr 2018

Features:
 * Add server list. (#864)

Bugfixes:
 * Disable mobile vote buttons so you can tap the video. (#865)
 * Fix vertical scrollbar appearing on mobile because of the AppBar height. (#859)

Internal:
 * Update material-ui and @material-ui/icons. (#857, #866)
 * Update to Babel 7. (#858)
 * Lazy load webpack config. (#862)
 * Remove custom sourceType parameter. (#861)
 * Use `qs-stringify` to simplify building the soundcloud embed URL. (#863)

# 1.4.3 / 07 Apr 2018

Features:
 * Show crash message + reload instruction on error. (#855)

Bugfixes:
 * Fix crashes when volume is way up. (#854)

# 1.4.2 / 05 Apr 2018

Bugfixes:
 * Build public/.

# 1.4.1 / 05 Apr 2018

Bugfixes:
 * Allow overriding MediaList rowComponent, fixes drag-drop in playlists. (#852)
 * Fix favouriting into existing playlist. (#851)
 * Apply fonts and colour styles to the body instead of to `.App`. (#848)
 * Fix vote icon alignment in user rows. (#850)
 * Slider fixes. (#849)

Internal:
 * Update i18next to the latest version 🚀 (#847)

# 1.4.0 / 05 Apr 2018

Features:
 * Update to the material-ui v1 beta. (#844)
 * Add vote icons in mobile layout when tapping the video. (#844)

Bugfixes:
 * Fix long playlist names overflowing in menus. (#844)
 * Fullscreen some dialogs in the mobile layout. (#844)

# 1.3.1 / 03 Apr 2018

Bugfixes:
 * Hide Google signin button on Register form if not available. (#843)

# 1.3.0 / 29 Mar 2018

Features:
 * Add WIP Mobile layout. (#514)

Internal:
 * Extract second timer from App container. (#836)

# 1.2.2 / 21 Mar 2018

Features:

 * Update react-loadable. (#834)
 * Name output chunks so that it's easier to see what code is being loaded in the network tab in devtools. (#834)

# 1.2.1 / 18 Mar 2018

Add compiled files to the published package.

# 1.2.0 / 18 Mar 2018

This version of the üWave Web Client requires u-wave-http-api@0.4.0 or higher.

Features:

 * Adapt top bar to logo size. (#806)
 * Social login. (#807)
 * More consistent spacing in the footer bar. (#810)
 * Request cookie sessions from HTTP API if supported. (#811)
 * Add setting for skip notifications in chat. (#820)
 * Add button to move first item to end of playlist. (#818)
 * Implement ACL roles handling. (#492)
 * Add initial draft of an admin page. (#741)

Bugfixes:

 * Fix fullscreen change detection. (#804)
 * Optimize html responses. (#805)
 * Synchronously add English language strings to i18next resources. (#812)
 * Bump overlay z-index so it is on top of HistoryButton. (#815)
 * Fix overlays diffing internally when switching between them. (#829)

Internal:

 * Switch to qs-stringify. (#814)

# 1.1.1 / 30 Jan 2018

Bugfixes:

 * Fix "Scroll to Bottom" button visibility. (#794)
 * Fix dialog close animation. (#801)
 * Fix progress spinner in Firefox. (#800)
 * Strip HTML from static markdown page titles. (#803)

Internal:

 * No longer test on Node versions below v8.9. (65dea161292f89f3afc765d6eb444020bbf12c66)
 * Move development API server to u-wave-api-v1. (#799)

# 1.1.0 / 13 Jan 2018

Features:

 * Add `/playback on|off` chat command to toggle media playback. (#777)
 * Add skip notifications. (#785)
 * Allow closing search results. (#787)
 * Scroll chat when pressing PageUp/PageDown keys. (#788)
 * Flash tab title when user is @-mentioned. (#789)

Bugfixes:

 * Remove last onTouchTap references. (#786)
 * Fix some build steps that were emitting code that does not run in old browsers. (#791)
 * Prevent publishing test coverage results to npm. (1a3397be784cb952dcc0a7c9f271011b467e46b5)

Internal:

 * Add Node 9 to CI. (#778)

# 1.0.0 / 19 Nov 2017

Features:

 * Compress web client files ahead of time. (#766)
 * Add subresource integrity. (#772)
 * Expose client configuration as a separate JSON endpoint. (#774)

Bugfixes:

 * Fix user cards opening slowly near window edge. (#769)
 * Fix socket authentication after it failed the first time. (#776)
 * Fix `enhance` on ConnectionIndicator. (3d94458b)

Internal:

 * Update dependencies.

# 1.0.0-beta.18 / 02 Nov 2017

Features:

 * Improve SettingsPanel design. (#745)
 * Rethrow boot errors for error reporting libraries. (#755)

Internal:

 * Bail on error in prod build. (#758)
 * Add prerelease npm script (#757)
 * Add common-shake. (#754)

# 1.0.0-beta.17 / 24 Sep 2017

Features:

 * Add offline indicator. (#737)
 * Add x-ua-compatible meta tag for IE. (#740)

Bugfixes:

 * Fix previous YouTube video restarting in the background when switching media source. (#744)

Internal:

 * Use reconnecting-websocket from npm. (#742)
 * Fix HMR rerendering (work around webpack bug I guess?). (#736)

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
