# A Responsive and Language-Aware Footer Component for Vue 3

Are you a blogger or content creator who operates in several languages? Do you have a multitude of social media accounts you need to share? Then you'll appreciate this responsive and language-aware footer component for Vue 3!

This footer component is designed to be user-friendly, responsive, and customizable, displaying the appropriate social links and icons based on the language and device type. The footer layout is minimalistic to keep the user's focus on the main content. It is straightforward and easy to use, and the responsiveness of the footer ensures that it looks good on any device and screen size.

## Data

The languages and social links data for this footer component are stored in JSON files in the data folder. The language.json file contains an array of objects, each representing a language. The value property of each language object represents the first two letters of a language code, and the text property stores the name of the language in its native script. The flag property stores the flag emoji of the corresponding country.

```json
[
  {
    "value": "en",
    "text": "English",
    "flag": "🇬🇧"
  },
  {
    "value": "et",
    "text": "Eesti",
    "flag": "🇪🇪"
  },
  ........
]
```

Below you will find the `social.json` file, which is home to an array of objects. Each object serves as a representation of a social link. The `icon` property holds the name of the corresponding SVG file in the assets folder, while the `name` property contains the name of the social platform itself. The `url` property, on the other hand, keeps track of the link to the social platform. Lastly, the `tags` property is an array of strings that showcase the languages the link is displayed for. If the string is `all`, then the link is visible for all languages. If the string is `desktop`, then the link will only show on desktop devices. Similarly, if the string is `mobile`, then the link will only display on mobile devices.

```json
[
  {
    "icon": "facebook.svg",
    "name": "Facebook",
    "url": "https://www.facebook.com/vuewebdev",
    "tags": ["en", "de", "vi", "et", "desktop"]
  },
  {
    "icon": "twitter.svg",
    "name": "Twitter",
    "url": "https://twitter.com/DiveWithOleg",
    "tags": ["en", "de", "vi", "et", "desktop"]
  },
  {
    "icon": "github.svg",
    "name": "GitHub",
    "url": "https://github.com/Divewitholeg",
    "tags": ["all", "desktop"]
  },
    ........
]
```

## Language Select Component

Let me walk you through the language select component. It's a straightforward select element that is linked to the lang.json file, which holds an array of languages assigned to the langs variable. By default, the lang variable is set to en. This lang variable is then bound to the v-model of the select element, allowing users to switch between available language options easily.

When a user selects a language from the dropdown, the lang event is triggered, and the selected language value is passed on to the parent component via the language.value variable. This way, the chosen language setting can be used throughout the entire application.

```vue
<script setup>
import langSelection from "../data/lang.json";
import { ref } from "vue";

const langs = Object.assign(langSelection);
const lang = ref("en");
defineEmits(["lang"]);
</script>
<template>
  <div>
    <select v-model="lang" class="p-1 text-sm rounded-lg text-gray-700">
      <option
        class="block px-4 py-2 hover:bg-gray-100"
        v-for="language in langs"
        :key="language.text"
        :value="language.value"
        @click="() => $emit('lang', language.value)"
      >
        {{ language.flag }} {{ language.text }}
      </option>
    </select>
  </div>
</template>
```

## Footer Component

Let's delve into the Footer Component, which comprises two components - `FooterMobile.vue` and `FooterDesktop.vue`.

### FooterMobile.vue

Starting with `FooterMobile.vue`, it's a simple div element styled using TailwindCSS. The component receives the `social` array as a prop, which is iterated using the `v-for` directive. Each object in the `social` array is defined as `link`. To display the social media links based on the user's language settings, the `v-if` directive checks whether the `link.tags` array includes the string `mobile`, and if it includes the string `all` (for all languages) or the `lang` variable (for each specific language). If the v-if directive evaluates to `true`, the `div` element with the corresponding social media icon and reference is displayed. The `a` element has an `href` attribute with the value of the `link.url` variable, and the `img` element has a `src` attribute with the value of the `link.icon` variable. The `alt` attribute has the value of the `link.name` variable, which is essential for web accessibility.

```vue
<script setup>
const props = defineProps({
  lang: {
    type: String,
    required: true,
  },
  social: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="flex justify-center my-2">
    <div v-for="link in social" :key="link.url">
      <div
        v-if="
          link.tags.includes('mobile') &&
          (link.tags.includes('all') || link.tags.includes(lang))
        "
        class="mx-3"
      >
        <a :href="link.url">
          <img
            :src="`/social/${link.icon}`"
            :alt="link.name"
            width="25"
            height="25"
        /></a>
      </div>
    </div>
  </div>
</template>
```

### FooterDesktop.vue

The `FooterDesktop.vue` component is only different from the `FooterMobile.vue` component in that the `v-if` directive checks if the `link.tags` array includes the string `desktop` instead of the string `mobile`.

```vue
<script setup>
const props = defineProps({
  lang: {
    type: String,
    required: true,
  },
  social: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="flex justify-center my-2">
    <div v-for="link in social" :key="link.url">
      <div
        v-if="
          link.tags.includes('desktop') &&
          (link.tags.includes('all') || link.tags.includes(lang))
        "
        class="mx-3"
      >
        <a :href="link.url">
          <img
            :src="`/social/${link.icon}`"
            :alt="link.name"
            width="25"
            height="25"
        /></a>
      </div>
    </div>
  </div>
</template>
```

## App.vue

The `App.vue` component is the parent component. It imports the `social.json` file and assigns it to the `social` variable. The `lang` variable is initialized with the value `en`. The `lang` variable is passed to the `FooterMobile.vue` and `FooterDesktop.vue` components as a prop. The `lang` variable is passed to the `FooterMobile.vue` and `FooterDesktop.vue` components via the `lang` event emitted by the `LanguageSelect.vue` component.

`useWindowSize` is a composition function from the `@vueuse/core` package. It returns the `width` and `height` of the browser window. The `width` variable is used to determine if the `FooterMobile.vue` or `FooterDesktop.vue` component should be displayed.

`defineAsyncComponent` is a function from the `vue` package. It is used to define an asynchronous component. The `FooterMobile.vue` and `FooterDesktop.vue` components are imported asynchronously.

`:lang` is a shorthand for `:lang="lang"`. `@lang` is a shorthand for `@lang="changeLang"`. The `changeLang` function is called when the `lang` event is emitted by the `LanguageSelect.vue` component.

`:social` is a shorthand for `:social="social"`. The `social` variable is passed to the `FooterMobile.vue` and `FooterDesktop.vue` components as a prop.

```vue
<script setup>
import NavigationLanguageSelect from "./components/NavigationLanguageSelect.vue";
import { useWindowSize } from "@vueuse/core";
import { ref } from "vue";
import { defineAsyncComponent } from "vue";
import socialMedia from "./data/social.json";

const social = Object.assign(socialMedia);
const FooterMobile = defineAsyncComponent(() =>
  import("./components/FooterMobile.vue")
);
const FooterDesktop = defineAsyncComponent(() =>
  import("./components/FooterDesktop.vue")
);
const { width } = useWindowSize();
const lang = ref("en");
function changeLang(newLang) {
  lang.value = newLang;
}
</script>

<template>
  <div class="bg-pink-300">
    <nav
      class="fixed top-0 h-12 w-screen flex items-center justify-between z-10 bg-pink-300"
    >
      <div class="ml-3">
        <img
          src="./assets/logo200black.svg"
          alt="logo of Oleg Rõbnikov Web Development"
          width="150"
          height="70"
        />
      </div>
      <div class="mr-3">
        <NavigationLanguageSelect @lang="changeLang" />
      </div>
    </nav>
    <main class="h-screen mt-12 mb-10 [&>p]:m-6 [&>p]:p-2 [&>p]:leading-6">
      <h1 class="text-xl text-center m-6">Oleg Rõbnikov Web Development</h1>
      <h2 class="text-lg text-center m-4">
        Responsive and Language Sensitive Footer
      </h2>
      <p>
        Current language is changed to <strong>{{ lang }}</strong
        >. Please note that language select doesn't change the language of this
        text. It is there to demonstrate how the footer changes based on the
        language selected.
      </p>
      <p>
        Width of the window is <strong>{{ width }}px</strong>. Try to resize the
        window. The footer will change based on the width of the window.
      </p>
      <p>
        Footer is the usual place for all your social media links like Facebook,
        Twitter, etc. As your website becomes more diverse and you add languages
        and media, the footer becomes overcrowded with all the icons. Most of
        these icons are not used by one part of your audience, while others are
        a mere distraction for another part of the website's visitors
      </p>
      <p>
        Let's show our visitors links to social media that they are more likely
        to use based on their language and the type of device they are using!
      </p>
    </main>
    <footer class="fixed bottom-0 h-10 z-10 w-full">
      <FooterMobile
        v-if="width < 769"
        :lang="lang"
        :social="social"
      /><FooterDesktop v-else :lang="lang" :social="social" />
    </footer>
  </div>
</template>
```

## Conclusion

Hope you will find this way of creating responsive and language sensitive footer useful. If you have any questions or suggestions, please leave a comment below. Also, would be nice to know what solution you are using for displaying social media links in your footer. Thanks for reading!

[e-mail]: mailto:rybniko@gmail.com
[github]: https://github.com/Divewitholeg
[linkedin]: https://www.linkedin.com/in/olegrybnikov/
[facebook]: https://www.facebook.com/vuewebdev
