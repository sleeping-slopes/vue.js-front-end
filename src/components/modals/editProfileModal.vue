<template>
<modal>
    <template v-slot:header>Edit your profile</template>
    <template v-slot:content>
        <form @submit.prevent="editProfile" class="h4 column gap-15 scroll" style="padding:0px 10px 0px 10px">
            <div class="row gap-20">
                <img class = "user-image s200x200" v-if="imageAvailable" @error="imageAvailable=false" :src="picturesrc"/>
                <div class = "user-image s200x200 bi bi-person-fill" v-else></div>
                <div class= "column gap-20">
                    <label class = "label h4">
                    <span>Display name</span>
                    <input type="text" v-bind:style="username.error?{'border-color':'red'}:{}"
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
                            v-model="city.data"
                        />
                        <span class="icon-text error" v-if=city.error>
                            <span class="bi bi-exclamation-circle-fill"></span><span>{{ city.error }}</span>
                        </span>
                        </label>
                        <label class = "label">
                        <span>Country</span>
                        <input type="text" v-bind:style="country.error?{'border-color':'red'}:{}"
                            v-model="country.data"
                        />
                        <span class="icon-text error" v-if=country.error>
                            <span class="bi bi-exclamation-circle-fill"></span><span>{{ country.error }}</span>
                        </span>
                        </label>
                    </div>
                    <label class = "label h5">
                    <span>Bio</span>
                    <textarea type="text" v-bind:style="bio.error?{'border-color':'red'}:{}" placeholder="Tell a little bit about yourself"
                        v-model="bio.data" style="resize: vertical; min-height:2.4em"></textarea>
                    <span class="icon-text error" v-if=bio.error>
                        <span class="bi bi-exclamation-circle-fill"></span><span>{{ bio.error }}</span>
                    </span>
                    </label>
                </div>
            </div>
            <hr>
            <div class="column gap-10 h5">
                <span class="secondary-text">Your links</span>
                <div class="column gap-20">
                    <div class="row gap-10 y-center">
                        <label class = "label">
                            <input type="text" placeholder="Web or email address"/>
                        </label>
                        <label class = "label">
                            <input type="text" placeholder="Short title"/>
                        </label>
                        <button class="button button-secondary form-button bi bi-trash3-fill"></button>
                    </div>
                    <div class="row gap-10 y-center">
                        <label class = "label">
                            <input type="text" placeholder="Web or email address"/>
                        </label>
                        <label class = "label">
                            <input type="text" placeholder="Short title"/>
                        </label>
                        <button class="button button-secondary form-button bi bi-trash3-fill"></button>
                    </div>
                </div>
                <button class = "button button-secondary hoverable">Add link</button>
            </div>
            <hr>
            <div class="row right">
                <button class = "button button-secondary hoverable h5 right" v-on:click="$router.replace({query: null})">Cancel</button>
                <button type="submit" class = "button button-primary h5 right">Save changes</button>
            </div>
        </form>
    </template>
</modal>
</template>

<script>

import modal from "@/components/containers/modal.vue"

export default
{
  name: 'editProfileModal',
  components: { modal },
  data()
  {
    return {
      username: { data: null, error: null },
      status: {data: null, error: null },
      city: {data: null, error: null },
      country: {data: null, error: null },
      bio: {data: null, error: null }
    }
  }
}

</script>

<style scoped>

.form-button
{
    border:2px solid var(--panel-border-color);
}

</style>