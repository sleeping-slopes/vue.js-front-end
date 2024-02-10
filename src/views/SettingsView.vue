<template>
    <div class="content column gap-20">
        <div class="column" style="padding-top:30px;">
            <span class="h2 primary-text">Settings</span>
            <nav class="nav-tab">
                <ul class="h3">
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
                    <span class="primary-text h4">Theme</span>
                    <div class="row h2 gap-10">
                        <button class="button button-secondary bi bi-brightness-high-fill" v-bind:class="{'toggled': theme==0 && customTheme}"
                            v-on:click="changeTheme(0)">
                        </button>
                        <button class="button button-secondary bi bi-moon-fill" v-bind:class="{'toggled': theme==1 && customTheme}"
                            v-on:click="changeTheme(1)">
                        </button>
                    </div>
                </div>
                <label class="label row y-center gap-5">
                    <button class="button button-secondary h4" style="padding:0;border:none;" v-bind:class="{'bi bi-check-square': customTheme, 'bi bi-check-square-fill toggled': !customTheme}"
                        v-on:click="toggleCustomTheme()">
                    </button>
                    <span class="h5">Use system theme</span>
                </label>
            </div>
            <hr>
            <form class="column" @submit.prevent="changeEmail">
                <label class = "label">
                    <span class="h4">Email</span>
                    <input type="text" class="h4" style="width:480px" v-bind:class="{'input-error': email.error}" placeholder="Enter email"
                        v-model="email.data"
                    />
                    <span class="icon-text notification-error h5" v-if=email.error>
                        <span class="bi bi-exclamation-circle-fill"></span><span>{{ email.error }}</span>
                    </span>
                </label>
                <button type="submit" class="button button-secondary h5">Change email</button>
            </form>
            <hr>
            <div class="column gap-5">
                <span class="primary-text h4">Password</span>
                <button class="button button-secondary h5" v-on:click="resetPassword">Send password-reset link to email</button>
            </div>
            <button class="button button-default toggled h6" style="margin-top:60px;" v-on:click="deleteAccount">Delete account</button>
        </div>
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
                if (!validEmail(this.email.data)) this.email.error='Invalid email.';
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


