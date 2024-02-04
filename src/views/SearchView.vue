<template>
    <div class="content column gap-0" style="padding-top:0px;">
      <div class="sticky-top" style="padding-bottom:20px;">
        <h2 class="primary-text">{{this.$route.query.q?.trim()?"Search results for '"+this.$route.query.q?.trim()+"'":"Search"}}</h2>
      </div>
      <div class="row">
        <div style="width:360px;">
            <nav class="nav-side sticky">
                <ul class="h3">
                    <li>
                        <router-link :to="{ name: 'SearchSongs', query:this.$route.query }">
                            <span class="icon-text"><span class="bi bi-music-note"></span><span>Songs</span></span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'SearchPlaylists', query:this.$route.query }">
                            <span class="icon-text"><span class="bi bi-music-note-list"></span><span>Playlists</span></span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'SearchUsers', query:this.$route.query }">
                            <span class="icon-text"><span class="bi bi-person-fill"></span><span>Users</span></span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="column"  style="width:810px">
            <errorMessage v-if="!this.$route.query.q?.trim()">
                <template v-slot:errorIcon><span class="bi bi-search"></span></template>
                <template v-slot:message>Search 3V3R51NC3 for songs, playlists and artists.</template>
            </errorMessage>
            <router-view :key="this.$route.query.q?.trim()" v-else/>
        </div>
      </div>
    </div>
</template>

<script>

import errorMessage from '@/components/containers/errorMessage.vue';

export default
{
  name: 'SearchView',
  components: { errorMessage }
}

</script>

<style scoped>

.sticky
{
    position:sticky;
    top:74.5px;
}

</style>