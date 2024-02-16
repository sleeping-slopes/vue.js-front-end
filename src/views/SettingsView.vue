<template>
    <div class="content column gap-20">
        <div class="column" style="padding-top:30px;">
            <span class="primary-text font-size-large">Settings</span>
            <nav class="nav-tab">
                <ul>
                    <li><router-link :to="{ name: 'Settings'}">Account</router-link></li>
                    <li><router-link :to="{ path: '404'}">Notifications</router-link></li>
                    <li><router-link :to="{ path: '404'}">Privacy</router-link></li>
                    <li><router-link :to="{ path: '404'}">Two Factor Authentication</router-link></li>
                </ul>
            </nav>
        </div>
        <div class="column gap-15" style="width:min-content">
            <div class="column gap-15">
                <div class="column gap-5">
                    <span class="primary-text font-size-medium">Theme</span>
                    <div class="row gap-10">
                        <button class="button button-secondary bi bi-brightness-high-fill" v-bind:class="{'toggled': theme==0 && customTheme}"
                            v-on:click="changeTheme(0)">
                        </button>
                        <button class="button button-secondary bi bi-moon-fill" v-bind:class="{'toggled': theme==1 && customTheme}"
                            v-on:click="changeTheme(1)">
                        </button>
                    </div>
                </div>
                <div class="form-checkbox">
                    <button class="button button-checkbox" id="checkbox_systemTheme" v-bind:class="{'bi bi-check-square': customTheme, 'bi bi-check-square-fill toggled': !customTheme}"
                        v-on:click="toggleCustomTheme()">
                    </button>
                    <label for="checkbox_systemTheme">Use system theme</label>
                </div>
            </div>
            <hr>
            <form class="column" @submit.prevent="changeEmail">
                <div class="form-field">
                    <label for="input_userEmail">Email</label>
                    <input id="input_userEmail" type="text" style="width:480px" v-bind:class="{'input-error': email.error}" placeholder="Enter email"
                        v-model="email.data"
                    />
                    <span class="icon-text notification-error" v-if=email.error>
                        <span class="bi bi-exclamation-circle-fill"></span><span>{{ email.error }}</span>
                    </span>
                </div>
                <button type="submit" class="button button-secondary">Change email</button>
            </form>
            <hr>
            <div class="column gap-5">
                <span class="primary-text font-size-medium">Password</span>
                <button class="button button-secondary" v-on:click="resetPassword">Send password-reset link to email</button>
            </div>
            <button class="button button-default toggled" style="margin-top:60px;" v-on:click="deleteAccount">Delete account</button>
        </div>
        <article class="project-info row">
            <p>
                <span>About website</span><br>
                Non-commercial project created solely for demonstration purposes.<br>
                I do not own the copyrights to the posted content.
            </p>
            <p >
                <span>Technologies used</span><br>
                Frontend: HTML, CSS (PostCSS), Vue.js, Axios<br>
                Backend: Express.js, MySQL, REST API, JSON Web Token
            </p>
            <p>Created by <a href="https://github.com/sleeping-slopes" class="accent-text alink" target=”_blank” rel="noopener noreferrer">@sleeping-slopes</a></p>
            <p class="right"><span class="accent-text">Language:&nbsp</span>English (US)</p>
        </article>
    </div>
</template>

<script>

import API from '@/axios/API';

import { validEmail } from "@/functions.js"

export default
{
    name: 'SettingsView',
    data()
    {
        return {
            email:{ data: this.$store.state.currentUser.email, error: null },
            theme: this.$store.state.currentUser.theme,
            customTheme: this.$store.state.currentUser.custom_theme
        }
    },
    methods:
    {
        async changeTheme(theme)
        {
            if (this.theme!=theme || this.customTheme==0)
            {
                this.theme=theme;
                this.$store.state.currentUser.theme = this.theme;

                this.customTheme=1;
                this.$store.state.currentUser.custom_theme = this.customTheme;

                const r = await API.put('me/theme', {theme:this.theme, customTheme:this.customTheme });
            }
        },
        async toggleCustomTheme()
        {
            this.customTheme = 1 - this.customTheme;
            this.$store.state.currentUser.custom_theme = this.customTheme;

            const r = await API.put('me/theme', {theme:this.theme, customTheme:this.customTheme });
        },
        async changeEmail()
        {
            this.email.data = this.email.data || null;
            this.email.error=null;
            if (this.email.data)
            {
                this.email.data = this.email.data.trim().toLowerCase();
                if (this.email.data.length>50) this.email.error='Enter an email that is up to 50 characters.';
                else if (!validEmail(this.email.data)) this.email.error='Invalid email.';
            }
            else this.email.error="Required field.";

            if (this.email.error) return;

            const r = await API.put('me/credentials', { email:this.email.data });
            if (r.error)
            {
                alert (JSON.stringify(r.error));
            }
        },
        async resetPassword()
        {
            alert("resetPassword");
        },
        async deleteAccount()
        {
            const r = await API.delete('me');
            // if (r.error)
            if (false)
            {
                alert (JSON.stringify(r.error));
            }
            else
            {
                this.$store.dispatch('logOut');
                this.$router.push({name: 'Root'});
            }
        }
    }
}

</script>


