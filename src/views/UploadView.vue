<template>
    <div class="content x-center">
        <div class="xy-center-absolute" v-if=!this.songs.length>
            <form class="drag-n-drop">
                <span class="primary-text font-size-large">Drag and drop your songs here</span>
                <button type="button" class="button button-primary hoverable" v-on:click="this.$refs.songsInput.click()">or choose files to upload</button>
                <input type="file" ref="songsInput" style="display:none" v-on:change="uploadSongs" accept=".mp3" multiple/>
                <div class="form-checkbox" style="width:min-content">
                    <button type="button" class="button button-checkbox" id="checkbox_makePlaylist" v-on:click="this.makePlaylist=!this.makePlaylist"
                        v-bind:class="{'bi bi-check-square': !this.makePlaylist, 'bi bi-check-square-fill toggled': this.makePlaylist }">
                    </button>
                    <label for="checkbox_makePlaylist">Make a playlist when multiple files are selected</label>
                </div>
            </form>
        </div>
        <form class="column" style="width:810px" @submit.prevent="submitLoadSongs" v-else>
            <panel v-for="(song,songIndex) in this.songs">
                <template v-slot:header>Upload song</template>
                <template v-slot:menu>
                    <button type="button" class="button button-secondary" v-on:click="openSongAudioFileInput(songIndex)">Replace file</button>
                    <input type="file" :ref="'songAudioInput'" style="display:none" v-on:change="uploadSongAudioFile($event,songIndex)" accept=".mp3" />
                    <button type="button" class="button button-default button-small bi bi-x-lg" v-on:click="this.songs.splice(songIndex,1)"></button>
                </template>
                <template v-slot:content>
                    <div class="column gap-10">
                        <div class="row gap-20">
                            <div class="cover-wrapper s200x200">
                                <img id="songCover" class="cover" :src="song.cover.url" v-if="song.cover">
                                <div class="cover bi bi-music-note" v-else></div>
                                <contextMenu class="x-center-absolute" style="top:50%; width:115px;">
                                    <template v-slot:header>
                                        <button type = "button" class="button">
                                            <span class="icon-text">
                                                <span class="bi bi-camera-fill"></span><span>Update cover</span>
                                            </span>
                                        </button>
                                    </template>
                                    <template v-slot:options>
                                        <li>
                                            <button type = "button" class="button" v-on:click="openSongCoverFileInput(songIndex)">Upload image</button>
                                            <input type="file" :ref="'songCoverInput'" style="display:none" v-on:change="uploadSongCoverFile($event,songIndex)" accept="image/*" />
                                        </li>
                                        <li>
                                            <button type = "button" class="button" v-on:click="song.cover=null">Delete image</button>
                                        </li>
                                    </template>
                                </contextMenu>
                            </div>
                            <div class="column gap-10 w-100">
                                <div class="form-field">
                                    <label for="input_songName">Name</label>
                                    <input id="input_songName" type="text" v-bind:class="{'input-error': false}" placeholder="Enter song name"
                                        v-model="song.name.data"
                                    />
                                    <span class="icon-text notification-error" v-if=song.name.error>
                                        <span class="bi bi-exclamation-circle-fill"></span><span>{{song.name.error}}</span>
                                    </span>
                                </div>
                                <div class="form-field">
                                    <label for="input_songTags">Tags</label>
                                    <input id="input_songTags" type="text" v-bind:class="{'input-error': false}" placeholder="Up to 5 space-separated tags"
                                        v-model="song.tags.data"
                                    />
                                    <span class="icon-text notification-error" v-if=song.tags.error>
                                        <span class="bi bi-exclamation-circle-fill"></span><span>{{song.tags.error}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="column gap-5">
                            <span class="primary-text font-size-medium">Artists</span>
                            <div class="column gap-15">
                                <div class="row gap-10" v-for="(artist,artistIndex) in song.artists">
                                    <div class="form-field">
                                        <input type="text" placeholder="Login"
                                            v-model="artist.login.data"
                                        />
                                        <span class="icon-text notification-error" v-if=artist.login.error>
                                            <span class="bi bi-exclamation-circle-fill"></span><span>{{ artist.login.error }}</span>
                                        </span>
                                    </div>
                                    <div class="form-field">
                                        <input type="text" placeholder="Pseudoname"
                                            v-model="artist.pseudoname.data"
                                        />
                                        <span class="icon-text notification-error" v-if=artist.pseudoname.error>
                                            <span class="bi bi-exclamation-circle-fill"></span><span>{{ artist.pseudoname.error }}</span>
                                        </span>
                                    </div>
                                    <button type="button" class="button form-button bi bi-trash3-fill" v-on:click="song.artists.splice(artistIndex,1)"></button>
                                </div>
                            </div>
                            <div class="row">
                                <button type="button" class="button button-secondary" :disabled='song.artists.length>=10'
                                    v-on:click="song.artists.push({login: { data:null, error:null }, pseudoname: { data:null, error:null }})">
                                    Add artist
                                </button>
                                <span class="icon-text notification-error" v-if="song.artists.length>=10">
                                    <span class="bi bi-exclamation-circle-fill"></span><span>A maximum of 10 artists can be added to song.</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </panel>
            <div class="row right">
                <button type="button" class="button button-secondary" v-on:click="this.songs=[]">Cancel</button>
                <button type="submit" class="button button-primary hoverable">Upload</button>
            </div>
        </form>
    </div>
</template>

<script>

import API from '@/axios/API';

import panel from '@/components/containers/panel.vue';
import contextMenu from '@/components/containers/contextMenu.vue';

export default
{
    name: 'UploadView',
    components: { panel,contextMenu },
    data()
    {
        return {
            validImageTypes: ['image/gif', 'image/jpeg', 'image/png'],
            validAudioTypes: ['audio/mpeg'],
            makePlaylist:false,
            songs: []
        }
    },
    methods:
    {
        uploadSongs(event)
        {
            this.songs=[];
            const selectedFiles = event.target.files;

            for (let i = 0;i<selectedFiles.length;i++)
            {
                if (!this.validAudioTypes.includes(selectedFiles[i].type)) continue;
                this.songs.push(
                {
                    name: { data: selectedFiles[i].name.split('.').slice(0, -1).join('.'), error:null },
                    tags: { data:"", error:null },
                    artists: [],
                    cover: null,
                    audio: selectedFiles[i]
                });
            }
        },

        openSongAudioFileInput(index)
        {
            this.$refs.songAudioInput[index].click();
        },
        uploadSongAudioFile(event,index)
        {
            const selectedFile = event.target.files[0];
            if (!selectedFile || !this.validAudioTypes.includes(selectedFile.type)) return;

            this.songs[index].audio = selectedFile;
        },

        openSongCoverFileInput(index)
        {
            this.$refs.songCoverInput[index].click();
        },
        uploadSongCoverFile(event,index)
        {
            const selectedFile = event.target.files[0];
            if (!selectedFile || !this.validImageTypes.includes(selectedFile.type)) return;

            this.songs[index].cover = { url: URL.createObjectURL(selectedFile), file: selectedFile};
        },
        async submitLoadSongs()
        {
            const uploadSongPromises = this.songs.map
            (
                async (song) =>
                {
                    song.name.data = song.name.data || null;
                    song.name.error = null;
                    if (song.name.data)
                    {
                        song.name.data = song.name.data.trim();
                        if (song.name.data.length>120) song.name.error='Enter a song name that is up to 120 characters.';
                    }
                    else song.name.error="Enter a song name.";

                    song.tags.data = song.tags.data || null;
                    song.tags.error = null;

                    let tagsArray = [];
                    if (song.tags.data)
                    {
                        song.tags.data = [...new Set(song.tags.data.trim().toLowerCase().replace('#','').replace(/\s+/g, ' ').split(' '))].join(' ');
                        tagsArray = song.tags.data.split(' ');
                        if (tagsArray.length>5) song.tags.error='Maximum 5 tags.';
                        tagsArray.forEach((tag) =>
                        {
                            if (tag.length>15) song.tags.error='One of tags is more than 15 characters.';
                        });
                    }
                    song.artists.forEach((artist) =>
                    {
                        artist.login.data = artist.login.data || null;
                        artist.login.error = null;
                        if (artist.login.data)
                        {
                            artist.login.data = artist.login.data.trim().toLowerCase();
                        }

                        artist.pseudoname.data = artist.pseudoname.data || null;
                        artist.pseudoname.error = null;
                        if (artist.pseudoname.data)
                        {
                            artist.pseudoname.data = artist.pseudoname.data.trim();
                            if (artist.pseudoname.data.length>50) artist.pseudoname.error='Enter a pseudoname that is up to 50 characters.';
                        }
                        if (!artist.login.data && !artist.pseudoname.data)
                        {
                            artist.login.error="Enter an artist username/pseudoname.";
                        }
                    });

                    const artistsError = song.artists.some(artist =>{ return artist.login.error || artist.pseudoname.error });

                    if (song.name.error || song.tags.error || artistsError || song.artists.length>10 ) return;

                    const fd = new FormData();

                    if (song.cover) fd.append('songCover',song.cover.file);
                    fd.append('songAudio',song.audio);
                    const songJSON = JSON.stringify({
                        name: song.name.data,
                        tags: tagsArray,
                        artists: song.artists.map((artist) => { return { login: artist.login.data, pseudoname: artist.pseudoname.data }})
                    });
                    fd.append('songJSON',songJSON);

                    const r = await API.post('me/songs', fd);
                    if (r.error)
                    {
                        if (r.error.message.artistsError)
                        {
                            r.error.message.artistsError.forEach(artistError =>
                            {
                                song.artists[artistError.index].login.error =  artistError.message;
                            });
                        }
                    }
                    else song.uploaded=true;
                }
            );
            await Promise.all(uploadSongPromises);
            this.songs = this.songs.filter(song => { return !song.uploaded });
        }
    }
}

</script>

<style scoped>

.drag-n-drop
{
    display:flex;
    flex-direction:column;
    padding:20px;
    border: 2px dashed var(--accent-color);
    align-items: center;
    justify-content: center;
    gap:20px;
    height:400px;
    width:810px;
    box-sizing: border-box;
}

</style>

