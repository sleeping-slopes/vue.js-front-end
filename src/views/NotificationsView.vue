<template>
    <errorMessage>
        <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
        <template v-slot:status>{{ "200" }}</template>
        <template v-slot:message>{{ "WIP: Notifications View" }}</template>
    </errorMessage>
    </template>

    <script>

    import errorMessage from "@/components/containers/errorMessage.vue";

    export default
    {
        name: 'NotificationsView',
        components: { errorMessage },
    }

    </script>


