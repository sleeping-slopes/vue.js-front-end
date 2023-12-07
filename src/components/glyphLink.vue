

<template>
    <a class="user-link secondary-text-hoverable"
        :href="'https://'+this.url"
        target=”_blank” rel="noopener noreferrer">
        <i :class="'bi bi-'+this.glyph"></i>
        {{this.description?this.description:this.url}}
    </a>
</template>

<script>


export default
{
  name: 'glyphLink',
  props:
  {
    url: {default:'null'},
    description: {default:null}
  },
  computed:
  {
    glyph()
    {
        let domain = this.url;
        const slashPos = this.url.indexOf('/');
        if (slashPos>0) domain = this.url.slice(0, slashPos);
        const dotPos = domain.lastIndexOf('.');
        if (dotPos>0) domain = domain.slice(0,dotPos);
        switch (domain)
        {
            case "t":
                return "telegram";
            case "twitter":
            case "x":
                return "twitter-x";
            case "youtube":
            case "youtu":
                return "youtube";
            case "twitch": return "twitch";
            case "spotify": return "spotify";
            case "instagram": return "instagram";
            case "facebook": return "facebook"
            default: return "globe";
        }
    }
  }
}
</script>

<style>

.user-link
{
    display:flex;
    width:min-content;
    white-space: nowrap;
    gap:3px;
    font-size:16px;
    text-decoration: none;
    align-items: center;
}

</style>