<template>
<teleport to=".app">
    <div class="modal-shade">
        <div class="modal">
            <panel :style="'width:'+this.width+';height:'+this.height+';'">
                <template v-slot:content>
                    <slot name="content"></slot>
                </template>
            </panel>
            <button class="bi bi-x modal-close-button" v-on:click="$router.replace({query:null})"/>
        </div>
    </div>
</teleport>
</template>

  <script>

  import panel from "@/components/containers/panel.vue"

  export default {
    name: 'modal',
    components: { panel },
    props:
    {
        width:{default:"auto"},
        height:{default:"auto"}
    }
  }
  </script>

  <style scoped>

.modal-shade
{
  position:fixed;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
  display:flex;
  justify-content: center;
  padding: 64px;
  background-color: rgba(0,0,0,0.5);
  z-index:999;
}

.modal
{
  position:relative;
  display:flex;
  height:fit-content;
  max-height: 100%;
}

.modal-close-button
{
  position:absolute;
  left:100%;
  top:0;
  padding:0px;
  margin:0px;
  background-color: transparent;
  color:white;
  border:none;
  cursor:pointer;
  font-size:48px;
}
  </style>