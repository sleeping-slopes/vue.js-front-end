

<template>
  <div style="width:100%;">
    <div class="error-message">
      <div class="errorIcon secondary-text" v-if="!!this.$slots.errorIcon"><slot name="errorIcon"></slot></div>
      <span class="h2 secondary-text" v-if="!!this.$slots.status"><slot name="status"></slot></span>
      <span class="h3 secondary-text" v-if="!!this.$slots.message"><slot name="message"></slot></span>
    </div>
  </div>
</template>

<script>

export default
{
  name: 'errorMessage'
}

</script>

<style>

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
}

.errorIcon
{
  font-size:48px;
}

</style>