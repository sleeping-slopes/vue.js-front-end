<template>
    <errorMessage>
        <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
        <template v-slot:status>{{ "200" }}</template>
        <template v-slot:message>{{ "WIP: Messages View" }}</template>
    </errorMessage>
    </template>
    <div class="content column">
        <article class="project-info row">
            <p>
                <span>About website</span><br>
                Non-commercial project created solely for demonstration purposes.<br>
                I do not own the copyrights to the posted content.
            </p>
            <p>
                <span>Technologies used</span><br>
                Frontend: HTML, CSS (PostCSS), Vue.js, Axios<br>
                Backend: Express.js, MySQL, REST API, JSON Web Token
            </p>
            <p>Created by <a href="https://github.com/sleeping-slopes" class="accent-text alink" target=”_blank” rel="noopener noreferrer">@sleeping-slopes</a></p>
            <p class="right"><span class="accent-text">Language:&nbsp</span>English (US)</p>
        </article>
    </div>

    <script>

    import errorMessage from "@/components/containers/errorMessage.vue";

    export default
    {
        name: 'MessagesView',
        components: { errorMessage },
    }

    </script>


