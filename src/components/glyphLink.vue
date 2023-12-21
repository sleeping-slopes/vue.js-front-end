

<template>
    <a class="icon-text secondary-text hoverable"
        :href="'https://'+this.url"
        target=”_blank” rel="noopener noreferrer">
        <span :class="'bi bi-'+this.glyph"></span>
        <span>{{this.description || this.url}}</span>
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