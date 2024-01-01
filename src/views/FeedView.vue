<template>
<errorMessage v-if="this.song.error">
    <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
    <template v-slot:status>{{ this.song.error.status }}</template>
    <template v-slot:message>{{ this.song.error.message }}</template>
</errorMessage>
<template v-else>
    <songBanner :id="this.id" />
    <div class="content row">
        <panel style="width:100%">
                <template v-slot:header>Related songs</template>
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
        <panel style="width:50%">
                <template v-slot:header>In playlists</template>
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
        <panel style="width:50%">
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
</template>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import songBanner from "@/components/songs/songBanner.vue";
import errorMessage from "@/components/containers/errorMessage.vue";
import songContainer from '@/components/songContainer.vue';

export default
{
    name: 'FeedView',
    components:{panel, songBanner, errorMessage, songContainer},
    props:
    {
        id: { default: "12" },
    },
    data()
    {
        return {
            song:{},
        }
    }
}
</script>


