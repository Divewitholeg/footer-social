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
