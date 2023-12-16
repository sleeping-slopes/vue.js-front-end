<template>
    <article class = "panel">
        <div class = "panel-header" v-if="!!this.$slots.header">
            <h3 class="primary-text">
              <slot name="header"></slot>
            </h3>
            <div class = "panel-menu">
                <slot name="menu"></slot>
            </div>
        </div>
        <div class = "panel-content">
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

<style>

.panel
{
  border: 2px solid var(--panel-border-color);
  background-color: var(--panel-background-color);
  border-radius:10px;
  display:flex;
  flex-direction: column;
  overflow:hidden;
  box-sizing: border-box;
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

.panel-menu
{
  height:100%;
  display:flex;
  align-items: center;
  gap:20px;
}

.panel-header-button
{
  height:100%;
  display:flex;
  align-items: center;
  color: var(--text-color-primary);
  border: none;
  background-color: transparent;
  text-decoration: none;
  cursor:pointer;
  padding:5px 5px 5px 5px;
  box-sizing: border-box;
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
}

</style>