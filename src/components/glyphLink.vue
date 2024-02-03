<template>
    <a class="icon-text secondary-text hoverable"
        :href="this.url"
        target=”_blank” rel="noopener noreferrer">
        <span :class="'bi bi-'+this.glyph"></span>
        <span>{{this.description}}</span>
    </a>
</template>

<script>

export default
{
  name: 'glyphLink',
  props:
  {
    url: { default: '/' },
    description: { default: null }
  },
  computed:
  {
    glyph()
    {
        let domain = this.url.replace(/^https?:\/\//, '');
        const slashPos = domain.indexOf('/');
        if (slashPos>0) domain = domain.slice(0, slashPos);
        const dotPos = domain.lastIndexOf('.');
        if (dotPos>0) domain = domain.slice(0,dotPos);
        switch (domain)
        {
            case "t":
            case "telegram":
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