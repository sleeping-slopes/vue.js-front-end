<template>
    <div class="content column">
        <errorMessage>
            <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
            <template v-slot:status>{{ "404" }}</template>
            <template v-slot:message>{{ "Page not found" }}</template>
        </errorMessage>
        <article class="project-info row">
            <p>
                <span>About website</span><br>
                Non-commercial project created solely for demonstration purposes.<br>
                I do not own the copyrights to the posted content.
            </p>
            <p>
                <span>Technologies used</span><br>
                Frontend: HTML, CSS (PostCSS), Vue.js, Axios;<br>
                Backend: Express.js, MySQL, REST API, Multer, JSON Web Token.
            </p>
            <p style="white-space:nowrap">Created by <a href="https://github.com/sleeping-slopes" class="accent-text alink" target=”_blank” rel="noopener noreferrer">@sleeping-slopes</a></p>
            <p class="right" style="white-space:nowrap"><span class="accent-text">Language:&nbsp</span>English (US)</p>
        </article>
    </div>
</template>

<script>

import errorMessage from "@/components/containers/errorMessage.vue";

export default
{
    name: 'PageNotFoundView',
    components: { errorMessage },
}

</script>


