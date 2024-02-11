<template>
    <article class="panel">
        <div class="panel-header" v-if="!!this.$slots.header">
            <span class="panel-caption">
              <slot name="header"></slot>
            </span>
            <div class="panel-menu">
                <slot name="menu"></slot>
            </div>
        </div>
        <div class="panel-content">
            <slot name="content"></slot>
        </div>
    </article>
</template>

<script>

export default
{
  name: 'panel'
}

</script>

<style scoped>

.panel
{
  border: 2px solid var(--panel-border-color);
  background-color: var(--panel-background-color);
  border-radius:10px;
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  height:fit-content;
}

.panel-header
{
  display:flex;
  height:40px;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0;
  padding:5px 10px 5px 10px;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom:1px solid var(--panel-border-color);
}

.panel-caption
{
  color: var(--text-color-primary);
  font-size:18px;
  font-weight:500;
}

.panel-menu
{
  height:100%;
  display:flex;
  align-items: center;
  gap:20px;
}
.panel-content
{
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow:hidden;
  width:100%;
  padding:5px;
  gap:5px;
  height:100%;
}

</style>