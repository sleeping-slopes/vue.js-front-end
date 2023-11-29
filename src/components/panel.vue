<template>
    <div class = "panel">
        <div class = "panel-header" v-if="!!this.$slots.header">
            <span class="panel-title">
              <slot name="header"></slot>
            </span>
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
  height:40px;
  align-items: center;
  color:var(--text-color-primary);
  white-space: nowrap;
  flex-shrink: 0;
  padding:5px 10px 5px 10px;
  justify-content: space-between;
  /* background-color:olive; */
  box-sizing: border-box;
  border-bottom:1px solid var(--panel-border-color);
}

.panel-title
{
  /* height:100%; */
  font-size:1.25rem;
  /* background-color:rebeccapurple; */
}

.panel-menu
{
  height:100%;
  display:flex;
  /* background-color:red; */
  /* height:fit-content; */
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
  padding:5px 10px 5px 10px;
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