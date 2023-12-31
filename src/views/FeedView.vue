<template>
<errorMessage v-if="this.song.error">
    <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
    <template v-slot:status>{{ this.song.error.status }}</template>
    <template v-slot:message>{{ this.song.error.message }}</template>
</errorMessage>
<template v-else>
    <div class="banner">
        <div class="column" style="overflow:visible">
            <div class="sticky-top">
                <div class="column">
                    <songLarge :id="this.id"></songLarge>
                    <nav class="navtab">
                        <div class="nav-menu">
                            <router-link class="tablink h3" :to="{ name: 'SongLikes', params: { id: this.id }}">Likes</router-link>
                            <router-link class="tablink h3" :to="{ name: 'SongPlaylists', params: { id: this.id }}">In playlists</router-link>
                            <router-link class="tablink h3" :to="{ name: 'SongRelated', params: { id: this.id }}">Related songs</router-link>
                        </div>
                    </nav>
                </div>
            </div>
            <panel>
                    <template v-slot:header>Related</template>
                    <template v-slot:menu>
                        <button class="button-secondary h5">
                            View all
                        </button>
                    </template>
                    <template v-slot:content>
                        <songContainer class="ul-list hidden-scroll"
                        :playlist="{id:'zalupa',songs:[{id:1,pos:0},{id:1,pos:1},{id:1,pos:2}]}"
                        :dynamicComponent="'songExtended'"
                        />
                    </template>
            </panel>
            <panel>
                    <template v-slot:header>Playlists</template>
                    <template v-slot:menu>
                        <button class="button-secondary h5">
                            View all
                        </button>
                    </template>
                    <template v-slot:content>
                        <songContainer class="ul-list hidden-scroll"
                        :playlist="{id:'zalupa',songs:[{id:1,pos:0},{id:1,pos:1},{id:1,pos:2}]}"
                        :dynamicComponent="'songExtended'"
                        />
                    </template>
            </panel>
            <panel>
                    <template v-slot:header>Likes</template>
                    <template v-slot:menu>
                        <button class="button-secondary h5">
                            View all
                        </button>
                    </template>
                    <template v-slot:content>
                        <songContainer class="ul-list hidden-scroll"
                        :playlist="{id:'zalupa',songs:[{id:1,pos:0},{id:1,pos:1},{id:1,pos:2}]}"
                        :dynamicComponent="'songExtended'"
                        />
                    </template>
            </panel>
        </div>
    </div>
</template>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import API from "@/axios/API";
import songLarge from "@/components/songs/songLarge.vue";
import errorMessage from "@/components/containers/errorMessage.vue";
import songContainer from '@/components/songContainer.vue';

export default
{
    name: 'FeedView',
    components:{panel, songLarge, errorMessage, songContainer},
    props:
    {
        id: { default: "12" },
    },
    data()
    {
        return {
            song:{},
        }
    },
    async created()
    {
        this.songs = await API.get('songs/'+this.id);
    }
}
</script>


