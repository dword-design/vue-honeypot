<!-- TITLE/ -->
# vue-honeypot
<!-- /TITLE -->

<!-- BADGES/ -->
  <p>
    <a href="https://npmjs.org/package/vue-honeypot">
      <img
        src="https://img.shields.io/npm/v/vue-honeypot.svg"
        alt="npm version"
      >
    </a><img src="https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue" alt="Linux macOS Windows compatible"><a href="https://github.com/dword-design/vue-honeypot/actions">
      <img
        src="https://github.com/dword-design/vue-honeypot/workflows/build/badge.svg"
        alt="Build status"
      >
    </a><a href="https://codecov.io/gh/dword-design/vue-honeypot">
      <img
        src="https://codecov.io/gh/dword-design/vue-honeypot/branch/master/graph/badge.svg"
        alt="Coverage status"
      >
    </a><a href="https://david-dm.org/dword-design/vue-honeypot">
      <img src="https://img.shields.io/david/dword-design/vue-honeypot" alt="Dependency status">
    </a><img src="https://img.shields.io/badge/renovate-enabled-brightgreen" alt="Renovate enabled"><br/><a href="https://gitpod.io/#https://github.com/dword-design/vue-honeypot">
      <img
        src="https://gitpod.io/button/open-in-gitpod.svg"
        alt="Open in Gitpod"
        width="114"
      >
    </a><a href="https://www.buymeacoffee.com/dword">
      <img
        src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
        alt="Buy Me a Coffee"
        width="114"
      >
    </a><a href="https://paypal.me/SebastianLandwehr">
      <img
        src="https://sebastianlandwehr.com/images/paypal.svg"
        alt="PayPal"
        width="163"
      >
    </a><a href="https://www.patreon.com/dworddesign">
      <img
        src="https://sebastianlandwehr.com/images/patreon.svg"
        alt="Patreon"
        width="163"
      >
    </a>
</p>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
A simple honeypot component for Vue.js.
<!-- /DESCRIPTION -->

A honeypot is an artificial input field that is invisible to the user but visible to spambots. Spambots try to fill out as many fields as possible, so this is an effective way to detect a spambot.

## Features

* Component and validation function
* Uses `position: absolute` and `opacity: 0` instead of `display: none` because some spambots detect `display: none`
* Hide the component for screen readers
* Disable autocomplete
* Disable tab focus

<!-- INSTALL/ -->
## Install via a package manager

```bash
# npm
$ npm install vue-honeypot

# Yarn
$ yarn add vue-honeypot
```

Add to local components:

```html
<script>
import VueHoneypot from 'vue-honeypot'

export default {
  components: {
    VueHoneypot,
  },
}
</script>
```

Or register as a global component:

```js
import VueHoneypot from 'vue-honeypot'

app.component('VueHoneypot', VueHoneypot)
```

Or register as a plugin:

```js
import VueHoneypot from 'vue-honeypot'

app.use(VueHoneypot)
```

## Install via CDN

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/vue-honeypot"></script>
```
<!-- /INSTALL -->

## Usage

Add the component to your form and add a `ref`:

```html
<template>
  <form @submit="submit">
    <label for="email">Email</label>
    <input type="email" id="email" />

    <label for="password">Password</label>
    <input type="password" id="password" />

    <!-- Setup the honeypot -->
    <vue-honeypot ref="honeypot" />
  </form>
</template>
```

Then validate the honeypot in the `submit` function:

```js
<script>
export default {
  methods: {
    submit() {
      try {
        this.$refs.honeypot.validate()
      } catch (error) {
        // error handling
      }
    },
  },
}
</script>
```

<!-- LICENSE/ -->
## Contribute

Are you missing something or want to contribute? Feel free to file an [issue](https://github.com/dword-design/vue-honeypot/issues) or a [pull request](https://github.com/dword-design/vue-honeypot/pulls)! ⚙️

## Support

Hey, I am Sebastian Landwehr, a freelance web developer, and I love developing web apps and open source packages. If you want to support me so that I can keep packages up to date and build more helpful tools, you can donate here:

<p>
  <a href="https://www.buymeacoffee.com/dword">
    <img
      src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
      alt="Buy Me a Coffee"
      width="114"
    >
  </a>&nbsp;If you want to send me a one time donation. The coffee is pretty good 😊.<br/>
  <a href="https://paypal.me/SebastianLandwehr">
    <img
      src="https://sebastianlandwehr.com/images/paypal.svg"
      alt="PayPal"
      width="163"
    >
  </a>&nbsp;Also for one time donations if you like PayPal.<br/>
  <a href="https://www.patreon.com/dworddesign">
    <img
      src="https://sebastianlandwehr.com/images/patreon.svg"
      alt="Patreon"
      width="163"
    >
  </a>&nbsp;Here you can support me regularly, which is great so I can steadily work on projects.
</p>

Thanks a lot for your support! ❤️

## License

[MIT License](https://opensource.org/licenses/MIT) © [Sebastian Landwehr](https://sebastianlandwehr.com)
<!-- /LICENSE -->
