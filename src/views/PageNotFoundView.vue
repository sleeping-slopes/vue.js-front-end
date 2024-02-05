<template>
    <errorMessage>
        <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
        <template v-slot:status>{{ "404" }}</template>
        <template v-slot:message>{{ "Page not found" }}</template>
    </errorMessage>
</template>

<script>

import errorMessage from "@/components/containers/errorMessage.vue";

export default
{
    name: 'PageNotFoundView',
    components: { errorMessage },
}

</script>


