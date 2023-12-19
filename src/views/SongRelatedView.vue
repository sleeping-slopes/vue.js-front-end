<template>
  <errorMessage>
    <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
    <template v-slot:message>Not implemented yet</template>
  </errorMessage>
</template>

<script>

import errorMessage from "@/components/containers/errorMessage.vue";

  export default {
    name: 'SongRelatedView',
    components:{errorMessage},
    props:
    {
      id: { default: "noid" },
    }
  }
  </script>

  <style>

  </style>