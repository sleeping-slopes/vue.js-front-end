<template>
<modal :width="'900px'">
    <template v-slot:header>Edit your profile</template>
    <template v-slot:content>
        <form @submit.prevent="editProfile" class="h4 column gap-15 scroll" style="padding:5px">
            <div class="row gap-20">
                <img class = "user-image s200x200" v-if="imageAvailable" :src="picturesrc"/>
                <div class = "user-image s200x200 bi bi-person-fill" v-else></div>
                <div class= "column gap-20 w-100">
                    <label class = "label h4">
                    <span>Display name</span>
                    <input type="text" v-bind:style="username.error?{'border-color':'red'}:{}" :placeholder="this.user.login"
                        v-model="username.data"
                    />
                    <span class="icon-text error" v-if=username.error>
                        <span class="bi bi-exclamation-circle-fill"></span><span>{{ username.error }}</span>
                    </span>
                    </label>
                    <label class = "label h5">
                    <span>Status</span>
                    <input type="text" v-bind:style="status.error?{'border-color':'red'}:{}"
                        v-model="status.data"
                    />
                    <span class="icon-text error" v-if=status.error>
                        <span class="bi bi-exclamation-circle-fill"></span><span>{{ status.error }}</span>
                    </span>
                    </label>
                    <div class="row gap-10 h5">
                        <label class = "label">
                            <span>City</span>
                            <input type="text" v-bind:style="city.error?{'border-color':'red'}:{}"
                                v-model="city.data"/>
                            <span class="icon-text error" v-if=city.error>
                                <span class="bi bi-exclamation-circle-fill"></span><span>{{ city.error }}</span>
                            </span>
                        </label>
                        <label class = "label">
                            <span>Country</span>
                            <input type="text" v-bind:style="country.error?{'border-color':'red'}:{}"
                                v-model="country.data"/>
                            <span class="icon-text error" v-if=country.error>
                                <span class="bi bi-exclamation-circle-fill"></span><span>{{ country.error }}</span>
                            </span>
                        </label>
                    </div>
                    <label class = "label h5">
                    <span>Bio</span>
                    <textarea rows="5" type="text" v-bind:style="bio.error?{'border-color':'red'}:{}" placeholder="Tell a little bit about yourself" style="resize: vertical;"
                        v-model="bio.data"></textarea>
                    <span class="icon-text error" v-if=bio.error>
                        <span class="bi bi-exclamation-circle-fill"></span><span>{{ bio.error }}</span>
                    </span>
                    </label>
                </div>
            </div>
            <hr>
            <div class="column gap-20 h5">
                <span class="secondary-text">Your links</span>
                <div class="column gap-15" v-if="this.links.length">
                    <div class="row gap-10" v-for="(link,index) in this.links">
                        <label class = "label">
                            <input type="text" v-bind:style="link.url.error?{'border-color':'red'}:{}" placeholder="Web or email address"
                                v-model="link.url.data"/>
                            <span class="icon-text error" v-if=link.url.error>
                                <span class="bi bi-exclamation-circle-fill"></span><span>{{ link.url.error }}</span>
                            </span>
                        </label>
                        <label class = "label">
                            <input type="text" v-bind:style="link.description.error?{'border-color':'red'}:{}" placeholder="Short title"
                                v-model="link.description.data"/>
                            <span class="icon-text error" v-if=link.description.error>
                                <span class="bi bi-exclamation-circle-fill"></span><span>{{ link.description.error }}</span>
                            </span>
                        </label>
                        <button type="button" class="button button-secondary form-button bi bi-trash3-fill" v-on:click="this.links.splice(index,1)"></button>
                    </div>
                </div>
                <button type="button" class = "button button-secondary hoverable" v-on:click="this.links.push({url: {data:'',error:null}, description: {data:'',error:null}})">Add link</button>
            </div>
            <hr>
            <div class="row right h5">
                <button type="button" class = "button button-secondary hoverable" v-on:click="$router.replace({query: null})">Cancel</button>
                <button type="submit" class = "button button-primary">Save changes</button>
            </div>
        </form>
    </template>
</modal>
</template>

<script>

import API from "@/axios/API";
import modal from "@/components/containers/modal.vue";

export default
{
  name: 'editProfileModal',
  components: { modal },
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
  created()
  {
    for (let i = 0;i<this.user.links.length;i++)
    {
        this.links.push({ url: {data: this.user.links[i].url, error: null}, description:{data: this.user.links[i].description, error: null}});
    }
  },
  props:
  {
    user: {default:undefined},
    imageAvailable: {default:false}
  },
  methods:
  {
    async editProfile()
    {
        this.username.data = this.username.data.trim();
        this.status.data = this.status.data.trim();
        this.city.data = this.city.data.trim();
        this.country.data = this.country.data.trim();
        this.bio.data = this.bio.data.trim();
        for (let i = 0;i<this.links.length;i++)
        {
            this.links[i].url.data=this.links[i].url.data.trim();
            this.links[i].url.data.replace(/^https?:\/\//, '',"");

            this.links[i].description.data=this.links[i].description.data.trim();
        }

        this.username.error=null;
        if (this.username.data.length>50) this.username.error = "Enter a display name that is up to 50 characters.";

        this.status.error=null;
        if (this.status.data.length>50) this.status.error = "Enter a status that is up to 50 characters.";

        this.city.error=null;
        if (this.city.data.length>35) this.city.error = "Enter a city that is up to 35 characters.";

        this.country.error=null;
        if (this.country.data.length>35) this.country.error = "Enter a country that is up to 35 characters.";

        this.bio.error=null;
        if (this.bio.data.length>280) this.bio.error = "Write a bio that is up to 200 characters.";

        for (let i = 0;i<this.links.length;i++)
        {
            this.links[i].url.error=null;
            this.links[i].description.error=null;
            if (this.links[i].description.data.length>60)
            {
                this.links[i].description.error = "Enter a description that is up to 60 characters.";
            }
            if (!this.links[i].url.data)
            {
                this.links[i].url.error = "Enter a web or email address.";
                continue;
            }
            if (this.links[i].url.data.length>60)
            {
                this.links[i].url.error = "Enter a web or email address that is up to 60 characters.";
                continue;
            }
            if (!(this.links[i].url.data.startsWith("http://") || this.links[i].url.data.startsWith("https://")))
            {
                this.links[i].url.data = "http://"+this.links[i].url.data;
            }
            if (!this.validURL(this.links[i].url.data))
            {
                this.links[i].url.error = "This URL or email is invalid.";
                continue;
            }
        }

        const linksError = this.links.some((link)=>{ return link.url.error || link.description.error });

        if (this.username.error || this.status.error || this.city.error || this.country.error || this.bio.error || linksError) return;

        const r = await API.put('users/'+this.user.login+'/action/edit/profile',
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
    validURL(url)
    {
      const regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
      return regex.test(url);
    },
  }
}

</script>

<style scoped>

.form-button
{
    border:2px solid var(--panel-border-color);
    height:20px;
    width:20px;
}

</style>