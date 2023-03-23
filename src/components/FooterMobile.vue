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
