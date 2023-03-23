# Responsive and Language Aware Vue 3 Footer

This is a responsive and language aware footer component for Vue 3. Blogging in several languages inevitably brings you to the point where you have a lot of accounts and links to share. Many of these social platforms are language specific or target either a mobile or desktop only audience. After a scurpulous review I have come up with 30! accounts on various platforms where I blog, communicate and share my work. This footer component is designed to be responsive and language aware. It will display the appropriate social links and icons based on the language and device type (by screen width).

## Data

I deliberately chose a minimalistic layout for this footer. I wanted to keep it simple and not distract the user from the content of the page to explain how to build components in a way that is easy to understand and use. I have also tried to make it as responsive as possible. It should look good on any device and screen size.

Data for languages and social links is stored in the `data` folder in json files. Languages are stored in an array of objects. Each object has a `value` representing the first two letters of a language code. The `name` of the language expressed in the characters of that language is stored under the `text` property and the flag emoji is stored under the flag property:

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

The `social.json` file below contains an array of objects. Each object represents a social link. The `icon` property is the name of the svg file in the assets folder. The `name` property is the name of the social platform. The `url` property is the link to the social platform. The `tags` property is an array of strings. The strings represent the languages for which the link is displayed. The string `all` means that the link is displayed for all languages. The string `desktop` means that the link is displayed only on desktop devices. The string `mobile` means that the link is displayed only on mobile devices.

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

The language select component is a simple select element. The `lang.json` file is imported and the `langs` array is assigned to it. The `lang` variable is initialized with the value `en`. The `lang` variable is bound to the `v-model` of the select element. The `language.value` variable is passed to the parent component via the `lang` event. The `lang` event is emitted when the user selects a language from the select element.

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

Consists of `FooterMobile.vue` and `FooterDesktop.vue` components.

### FooterMobile.vue

The `FooterMobile.vue` component is a simple div element styled with TailwindCSS. The `v-for` directive iterates over the `social` array passed to the component as a prop and defining each object in the `social` array as `link`. The `v-if` directive checks if the `link.tags` array includes the string `mobile` and if the `link.tags` array includes the string `all` (for all languages) or the `lang` variable (for each specific language). If the `v-if` directive evaluates to `true` the `div` element with the corresponding social media icon and reference is displayed. The `a` element has a `href` attribute with the value of the `link.url` variable. The `img` element has a `src` attribute with the value of the `link.icon` variable. The `alt` attribute has the value of the `link.name` variable.

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
