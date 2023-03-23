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
