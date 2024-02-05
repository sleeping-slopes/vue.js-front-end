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
            <div class="column gap-10">
                <span class="primary-text h4">Theme</span>
                <div class="row h2 gap-5">
                    <button class ="button button-secondary bi bi-gear-fill" v-bind:class="{'toggled': theme==0 && !systemTheme}"
                        v-on:click="changeTheme(0)">
                    </button>
                    <button class ="button button-secondary bi bi-gear-fill" v-bind:class="{'toggled': theme==1 && !systemTheme}"
                        v-on:click="changeTheme(1)">
                    </button>
                </div>
                <label class="label row y-center h5">
                    <button class="button button-secondary bi bi-gear-fill" v-bind:class="{'toggled': systemTheme}"
                        v-on:click="toggleSystemTheme(1)">
                    </button>
                    <span>Use system theme</span>
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

export default
{
    name: 'SettingsView',
    data()
    {
        return {
            email:{ data: null, error: null },
            theme: 1,
            systemTheme: false
        }
    },
    async created()
    {
        const user = await API.get('me/credentials');
        this.email.data = user.email;
    },
    methods:
    {
        changeTheme(theme)
        {
            this.theme=theme;
        },
        toggleSystemTheme()
        {
            this.systemTheme=!this.systemTheme;
        },
        async changeEmail()
        {
            this.email.data = this.email.data || null;
            this.email.error=null;
            if (this.email.data)
            {
                this.email.data = this.email.data.trim().toLowerCase();
                if (!this.validEmail(this.email.data)) this.email.error='Invalid email.';
            }
            else this.email.error="Required field.";

            if (this.email.error) return;

            const r = await API.put('me/credentials', { email:this.email.data });
            if (r.error)
            {
                alert (JSON.stringify(r.error));
            }
        },
        validEmail(email)
        {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        },
        async resetPassword()
        {
            alert("resetPassword");
        },
        async deleteAccount()
        {
            const r = await API.delete('me');
            if (r.error)
            {
                alert (JSON.stringify(r.error));
            }
        }
    }
}

</script>


