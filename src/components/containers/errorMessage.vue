

<template>
<div class="error-message">
  <div class="errorIcon secondary-text" v-if="!!this.$slots.errorIcon"><slot name="errorIcon"></slot></div>
  <span class="font-size-large secondary-text" v-if="!!this.$slots.status"><slot name="status"></slot></span>
  <span class="font-size-big secondary-text" v-if="!!this.$slots.message"><slot name="message"></slot></span>
</div>
</template>

<script>

export default
{
  name: 'errorMessage'
}

</script>

<style scoped>

.error-message
{
  width:100%;
  padding-top:20px;
  padding-bottom:20px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:10px;
  box-sizing: border-box;
}

.errorIcon
{
  font-size:48px;
}

</style>