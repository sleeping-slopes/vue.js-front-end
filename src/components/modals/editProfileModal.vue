<template>
<modal :width="'900px'">
    <template v-slot:header>Edit your profile</template>
    <template v-slot:content>
        <form @submit.prevent="editProfile" class="column gap-15 scroll" style="padding:5px">
            <div class="row gap-20">
                <div style="height:min-content;position:relative;">
                    <img class="user-image s200x200" :src="picturesrc" v-if="this.user.profile_picture"/>
                    <div class="user-image s200x200 bi bi-person-fill" v-else></div>
                    <contextMenu class="x-center-absolute" style="top:calc(100% - 50px); min-width:120px;">
                        <template v-slot:header>
                            <button type = "button" class="button">
                                <span class="icon-text">
                                    <span class="bi bi-camera-fill"></span><span>Update image</span>
                                </span>
                            </button>
                        </template>
                        <template v-slot:options>
                            <li>
                                <button type = "button" class="button" v-on:click="this.$refs.profilePictureInput.click()">Replace image</button>
                                <input type="file" ref="profilePictureInput" style="display:none" v-on:change="uploadProfilePicture" accept="image/*"/>
                            </li>
                            <li>
                                <button type = "button" class="button" v-on:click="deleteProfilePicture">Delete image</button>
                            </li>
                        </template>
                    </contextMenu>
                </div>
                <div class="column gap-20 w-100">
                    <div class="form-field">
                        <label for="input_userUsername">Display name</label>
                        <input id="input_userUsername" type="text" v-bind:class="{'input-error': username.error}" :placeholder="this.user.login"
                            v-model="username.data"
                        />
                        <span class="icon-text notification-error" v-if=username.error>
                            <span class="bi bi-exclamation-circle-fill"></span><span>{{ username.error }}</span>
                        </span>
                    </div>
                    <div class="form-field">
                        <label for="input_userStatus">Status</label>
                        <input id="input_userStatus" type="text" v-bind:class="{'input-error': status.error}"
                            v-model="status.data"
                        />
                        <span class="icon-text notification-error" v-if=status.error>
                            <span class="bi bi-exclamation-circle-fill"></span><span>{{ status.error }}</span>
                        </span>
                    </div>
                    <div class="row gap-10">
                        <div class="form-field">
                            <label for="input_userCity">City</label>
                            <input id="input_userCity" type="text" v-bind:class="{'input-error': city.error}"
                                v-model="city.data"
                            />
                            <span class="icon-text notification-error" v-if=city.error>
                                <span class="bi bi-exclamation-circle-fill"></span><span>{{ city.error }}</span>
                            </span>
                        </div>
                        <div class="form-field">
                            <label for="input_userCountry">Country</label>
                            <input id="input_userCountry" type="text" v-bind:class="{'input-error': country.error}"
                                v-model="country.data"
                            />
                            <span class="icon-text notification-error" v-if=country.error>
                                <span class="bi bi-exclamation-circle-fill"></span><span>{{ country.error }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="form-field">
                        <label for="input_userBio">Bio</label>
                        <textarea id="input_userBio" rows="5" type="text" v-bind:class="{'input-error': bio.error}" placeholder="Tell a little bit about yourself" style="resize: vertical;"
                            v-model="bio.data"></textarea>
                        <span class="icon-text notification-error" v-if=bio.error>
                            <span class="bi bi-exclamation-circle-fill"></span><span>{{ bio.error }}</span>
                        </span>
                    </div>
                </div>
            </div>
            <hr>
            <div class="column gap-20">
                <span class="primary-text font-size-medium">Your links</span>
                <div class="column gap-15" v-if="this.links.length">
                    <div class="row gap-10" v-for="(link,linkIndex) in this.links">
                        <div class="form-field">
                            <input type="text" v-bind:class="{'input-error': link.url.error}" placeholder="Web or email address"
                                v-model="link.url.data"
                            />
                            <span class="icon-text notification-error" v-if=link.url.error>
                                <span class="bi bi-exclamation-circle-fill"></span><span>{{ link.url.error }}</span>
                            </span>
                        </div>
                        <div class="form-field">
                            <input type="text" v-bind:class="{'input-error': link.description.error}" placeholder="Short title"
                                v-model="link.description.data"
                            />
                            <span class="icon-text notification-error" v-if=link.description.error>
                                <span class="bi bi-exclamation-circle-fill"></span><span>{{ link.description.error }}</span>
                            </span>
                        </div>
                        <button type="button" class="button form-button bi bi-trash3-fill" v-on:click="this.links.splice(linkIndex,1)"></button>
                    </div>
                </div>
                <div class="row">
                    <button type="button" class="button button-secondary"
                    v-on:click="this.links.push({url: { data:null, error:null }, description: { data:null, error:null }})" :disabled='this.links.length>=10'>Add link</button>
                    <span class="icon-text notification-error" v-if="this.links.length>=10">
                        <span class="bi bi-exclamation-circle-fill"></span><span>A maximum of 10 links can be added to your profile.</span>
                    </span>
                </div>
            </div>
            <hr>
            <div class="row right">
                <button type="button" class="button button-secondary" v-on:click="$router.replace({query: null})">Cancel</button>
                <button type="submit" class="button button-primary">Save changes</button>
            </div>
        </form>
    </template>
</modal>
</template>

<script>

import API from "@/axios/API";

import modal from "@/components/containers/modal.vue";
import contextMenu from "@/components/containers/contextMenu/contextMenu.vue";

import { validURL } from "@/functions.js"

export default
{
  name: 'editProfileModal',
  components: { modal,contextMenu },
  data()
  {
    return {
      username: { data: this.user.username, error: null },
      status: {data: this.user.status, error: null },
      city: {data: this.user.city, error: null },
      country: {data: this.user.country, error: null },
      bio: {data: this.user.bio, error: null },
      links: [],
      picturesrc: API.defaults.baseURL+`users/`+this.user.login+`/picture`
    }
  },
  props:
  {
    user: {default:undefined}
  },
  created()
  {
    for (let i = 0;i<this.user.links.length;i++)
    {
        this.links.push({ url: {data: this.user.links[i].url, error: null}, description:{data: this.user.links[i].description, error: null}});
    }
  },
  methods:
  {
    async editProfile()
    {
        this.username.data = this.username.data || null;
        this.username.error=null;
        if (this.username.data)
        {
            this.username.data = this.username.data.trim();
            if (this.username.data.length>50) this.username.error = "Enter a display name that is up to 50 characters.";
        }

        this.status.data = this.status.data || null;
        this.status.error=null;
        if (this.status.data)
        {
            this.status.data = this.status.data.trim();
            if (this.status.data.length>50) this.status.error = "Enter a status that is up to 50 characters.";
        }

        this.city.data = this.city.data || null;
        this.city.error=null;
        if (this.city.data)
        {
            this.city.data = this.city.data.trim();
            if (this.city.data.length>35) this.city.error = "Enter a city that is up to 35 characters.";
        }

        this.country.data = this.country.data || null;
        this.country.error=null;
        if (this.country.data)
        {
            this.country.data = this.country.data.trim();
            if (this.country.data.length>35) this.country.error = "Enter a country that is up to 35 characters.";
        }

        this.bio.data = this.bio.data || null;
        this.bio.error=null;
        if (this.bio.data)
        {
            this.bio.data = this.bio.data.trim();
            if (this.bio.data.length>200) this.bio.error = "Write a bio that is up to 200 characters.";
        }

        for (let i = 0; i < this.links.length; i++)
        {
            this.links[i].url.data = this.links[i].url.data || null;
            this.links[i].url.error=null;
            if (this.links[i].url.data)
            {
                this.links[i].url.data=this.links[i].url.data.trim();
                if (this.links[i].url.data.length>60) this.links[i].url.error = "Enter a web or email address that is up to 60 characters.";
                else
                {
                    if (!(this.links[i].url.data.startsWith("http://") || this.links[i].url.data.startsWith("https://")))
                    {
                        this.links[i].url.data = "http://"+this.links[i].url.data;
                    }
                }
                if (!validURL(this.links[i].url.data))this.links[i].url.error = "This URL or email is invalid.";
            }
            else this.links[i].url.error = "Enter a web or email address.";

            this.links[i].description.data = this.links[i].description.data || null;
            this.links[i].description.error=null;
            if (this.links[i].description.data)
            {
                this.links[i].description.data=this.links[i].description.data.trim();
                if (this.links[i].description.data.length>60) this.links[i].description.error = "Enter a description that is up to 60 characters.";
            }
        }

        const linksError = this.links.some((link)=>{ return link.url.error || link.description.error });

        if (this.username.error || this.status.error || this.city.error || this.country.error || this.bio.error || linksError || this.links.length>10) return;

        const r = await API.put('me/profile',
        {
            username:this.username.data, status:this.status.data, city: this.city.data, country: this.country.data, bio: this.bio.data,
            links: this.links.map((link) => { return { url: link.url.data, description: link.description.data } })
        });
        if (r.error)
        {
            alert (JSON.stringify(r.error));
        }
        else
        {
            await this.$store.dispatch('loadUser',this.user.login);
            this.$router.replace({query: null});
        }
    },
    async uploadProfilePicture(event)
    {
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        const selectedFile = event.target.files[0];
        if (!selectedFile || !validImageTypes.includes(selectedFile.type)) return;

        const fd = new FormData();
        fd.append('userProfilePicture',selectedFile,selectedFile.name);
        const r = await API.post('me/profile-picture', fd);
    },
    async deleteProfilePicture()
    {
      const r = await API.delete('me/profile-picture');
    }
  }
}

</script>