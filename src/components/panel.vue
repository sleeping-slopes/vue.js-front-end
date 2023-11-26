<template>
    <div class = "panel">
        <div class = "panel-header" v-if="!!this.$slots.header">
            <slot name="header"></slot>
            <div class = "panel-menu">
                <slot name="menu"></slot>
            </div>
        </div>
        <div class = "panel-content">
            <slot name="content"></slot>
        </div>
    </div>
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
  height:48px;
  align-items: center;
  color:var(--text-color-primary);
  white-space: nowrap;
  flex-shrink: 0;
  padding-left:5px;
  padding-right:15px;
  font-size:1.25em;
  font-weight: bold;
  justify-content: space-between;
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

.panel-header-button
{
  color: var(--text-color-primary);
  border: none;
  background-color: transparent;
  text-decoration: none;
  cursor:pointer;
  font-size:1rem;
}

.panel-header-button:active
{
  color: var(--text-color-secondary);
}
</style>
<!--
.button-switch
{
    background-color:var(--panel-border-color);
    color: var(--text-color-secondary);
    height:100%;
    width:100%;
    cursor:pointer;
    white-space: nowrap;
    border:none;
    position:relative;
}

.button-switch i
{
    margin-right:4px;
}

.button-switch:hover
{
  color: var(--text-color-primary);
}

.button-switch.active
{
  color: var(--text-color-primary);
  background-color:transparent;
}

.button-switch.active::after
{
  content:"";
  position:absolute;
  width:100%;
  height:2px;
  background-color:cornflowerblue;
  left:0;
  right:0;
  margin-left: auto;
  margin-right: auto;
  bottom:0px;
} -->