<script setup>
import { ref } from "vue";
import langSelection from "../data/lang.json";

const langs = Object.assign(langSelection);
const lang = ref("en");
defineEmits(["lang"]);
</script>
<template>
  <div>
    <select
      v-model="lang"
      class="p-1 text-sm rounded-lg text-gray-700"
    >
      <option
        v-for="language in langs"
        :key="language.text"
        class="block px-4 py-2 hover:bg-gray-100"
        :value="language.value"
        @click="() => $emit('lang', language.value)"
      >
        {{ language.flag }} {{ language.text }}
      </option>
    </select>
  </div>
</template>
