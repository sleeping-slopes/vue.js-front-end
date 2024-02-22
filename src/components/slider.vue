<template>
    <div class="slider-wrapper" v-bind:class="{'dragging':this.dragging,'vertical':this.vertical,'horizontal':!this.vertical}"
        v-on:mousedown.stop="mouseDownSlider">
        <div class="progress-bg" v-bind:class="{'x-center-absolute':this.vertical,'y-center-absolute':!this.vertical}"></div>
        <div class="progress" v-bind:class="{'x-center-absolute':this.vertical,'y-center-absolute':!this.vertical}" :style="this.progressStyle"></div>
        <div class="slider-handle" :style="this.handlerStyle"></div>
    </div>
</template>

<script>

export default
{
  name: 'slider',
  props:
  {
    vertical:{default:false},
    minValue:{default: 0},
    value: {default: 50},
    maxValue:{default: 100}
  },
  data()
  {
    return{
        dragging:false,
        dragProgress:0
    }
  },
  computed:
  {
    progressStyle()
    {
        if (!this.vertical)
        return "width:"+(this.dragging?this.dragProgress:this.progress)*100+"%";
        return "height:"+(this.dragging?this.dragProgress:this.progress)*100+"%";
    },
    handlerStyle()
    {
        if (!this.vertical)
        return "left:"+(this.dragging?this.dragProgress:this.progress)*100+'%';
        return "bottom:"+(this.dragging?this.dragProgress:this.progress)*100+"%";
    },
    progress()
    {
        if (this.minValue >= this.maxValue || this.value<this.minValue || this.value > this.maxValue) return 0;
        return this.value/(this.maxValue-this.minValue);
    }
  },
  methods:
  {
    mouseDownSlider(event)
    {
        event.stopPropagation();
        event.preventDefault();
        event.cancelBubble=true;
        event.returnValue=false;

        const bcr = this.$el.getBoundingClientRect();
        if (!this.vertical) this.dragProgress = Math.min(1,Math.max(0, (event.x - bcr.left) / bcr.width));
        else this.dragProgress = 1 - Math.min(1,Math.max(0, (event.y - bcr.top) / bcr.height));

        this.dragging = true;
    },
    mouseMove(event)
    {
        if (this.dragging)
        {
            const bcr = this.$el.getBoundingClientRect();
            if (!this.vertical) this.dragProgress = Math.min(1,Math.max(0, (event.x - bcr.left) / bcr.width));
            else this.dragProgress = 1 - Math.min(1,Math.max(0, (event.y - bcr.top) / bcr.height));
        }
    },
    mouseUp(event)
    {
        if (this.dragging)
        {
            const newValue = this.dragProgress*(this.maxValue-this.minValue)+this.minValue;
            this.$emit('changeProgress',newValue);
            this.dragging=false;
        }
    }
  },
  mounted()
  {
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  },
  beforeUnmount()
  {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
  }
}

</script>

<style scoped>

.slider-wrapper { position:relative; cursor:pointer; }

.slider-wrapper.horizontal
{
    height:8px;
    padding-top:12px;
    padding-bottom:12px;
}

.slider-wrapper.vertical
{
    width:8px;
    padding-left:4px;
    padding-right:4px;
}

.slider-wrapper > .progress-bg
{
    background-color:var(--text-color-secondary);
    position:absolute;
    border-radius:2px;
}

.slider-wrapper.horizontal > .progress-bg { width:100%; height:4px; }
.slider-wrapper.vertical > .progress-bg { width:4px; height:100%; }

.slider-wrapper > .progress
{
    background-color: var(--accent-color);
    position:absolute;
    border-radius:2px;
}

.slider-wrapper.horizontal > .progress { height:4px; }
.slider-wrapper.vertical > .progress { width:4px; bottom:0px; }

.slider-wrapper > .slider-handle
{
    background-color: var(--accent-color);
    position:absolute;
    width:8px;
    height:8px;
    border-radius: 50%;
    opacity:0.0;
    transition: opacity 0.1s;
}

.slider-wrapper:hover > .slider-handle,
.slider-wrapper.dragging > .slider-handle
{
    opacity:1.0;
}

.slider-wrapper.horizontal > .slider-handle { transform: translateX(-50%); }
.slider-wrapper.vertical > .slider-handle { transform: translateY(50%); }

</style>