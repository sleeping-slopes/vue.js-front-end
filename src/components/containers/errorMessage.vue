

<template>
<div class="error-message">
  <div class="error-icon secondary-text" v-if="!!this.$slots.errorIcon"><slot name="errorIcon"></slot></div>
  <span class="secondary-text font-size-large" v-if="!!this.$slots.status"><slot name="status"></slot></span>
  <span class="secondary-text font-size-big" v-if="!!this.$slots.message"><slot name="message"></slot></span>
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

.error-icon
{
  font-size:48px;
}

</style>