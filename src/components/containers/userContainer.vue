<template>
  <template v-if="this.users">
    <errorMessage  v-if="this.users.error">
      <template v-slot:errorIcon><span class="bi bi-person-fill"></span></template>
      <template v-slot:message>{{ this.users.error.message }}</template>
    </errorMessage>
      <ul class="container" :class="type" v-else>
        <li v-for="(user) in getShortList">
          <component :is = "this.dynamicComponent" :login="user.login"
            @loaded="this.counter++">
          </component>
        </li>
      </ul>
  </template>
  <div class="loader-wrapper" v-else>
    <div class="loader"></div>
  </div>
</template>

<script>

import userCard from '@/components/users/userCard.vue'
import userItem from '@/components/users/userItem.vue'
import userIcon from '@/components/users/userIcon.vue'

import errorMessage from "@/components/containers/errorMessage.vue"

export default
{
  name: 'userContainer',
  components:
  {
      userCard, userItem, userIcon,
      errorMessage
  },
  props:
  {
    users: { default: undefined },
    maxDisplay: { default: 0 },
    type: { default: '' },
    dynamicComponent: { default: "userCard" }
  },
  data()
  {
    return {
      counter:0
    }
  },
  computed:
  {
    loaded() { return this.counter==this.getShortList.length },
    getShortList() { return this.maxDisplay<1?this.users:this.users.slice(0,this.maxDisplay); }
  },
}
</script>