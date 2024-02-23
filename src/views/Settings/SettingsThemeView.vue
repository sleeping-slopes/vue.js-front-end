<template>
<div class="column gap-15" style="width:360px;">
  <div class="column">
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
  <div class="column gap-5">
    <span class="primary-text font-size-medium">Accent color</span>
    <ul class="row gap-10">
      <li v-for="(accentColor,index) in this.$store.state.accentColors">
        <button class="button button-color" v-bind:class="{'bi bi-check-lg':this.accentColor==index}" v-bind:style="{'background-color': accentColor.hex}"
          v-on:click="changeAccentColor(index)">
        </button>
      </li>
    </ul>
  </div>
</div>
</template>

<script>

import API from '@/axios/API';

export default
{
  name: 'ThemeSettingsView',
  data()
  {
    return {
      theme: this.$store.getters.getCurrentUser.theme,
      customTheme: this.$store.getters.getCurrentUser.custom_theme,
      accentColor: this.$store.getters.getCurrentUser.accent_color
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

        const r = await API.put('me/theme', { theme:this.theme, customTheme:this.customTheme });
      }
    },
    async toggleCustomTheme()
    {
      this.customTheme = 1 - this.customTheme;
      this.$store.state.currentUser.custom_theme = this.customTheme;

      const r = await API.put('me/theme', { theme:this.theme, customTheme:this.customTheme });
    },
    async changeAccentColor(accentColor)
    {
      if (this.accentColor!=accentColor)
      {
        this.accentColor=accentColor;
        this.$store.state.currentUser.accent_color = this.accentColor;

        const r = await API.put('me/accent-color', { accentColor:this.accentColor });
      }
    }
  }
}

</script>


