<template>
  <div class="graph">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Graph',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  provide() {
    return { graph: this };
  },
  data() {
    return {
      size: {
        width: 0,
        height: 0,
      }
    };
  },
  computed: {
    giraffe() {
      return {
        scale: this.scale,
        width: this.size.width,
        height: this.size.height,
        maxValues: this.maxValues,
        dataLength: this.data.length,
      };
    },
    maxValues() {
      let x = this.data[0].x;
      for (let i = 1; i < this.data.length; i++) {
        if (this.data[i].x > x) {
          x = this.data[i].x;
        }
      }

      let y = this.data[0].y;
      for (let i = 1; i < this.data.length; i++) {
        if (this.data[i].y > y) {
          y = this.data[i].y;
        }
      }

      return { x, y };
    },
    scale() {
      return {
        x: this.size.width / this.maxValues.x,
        y: this.size.height / this.maxValues.y,
      };
    }
  },
  mounted() {
    // We can now populate our reactive object properly
    this.size.width = this.$el.clientWidth;
    this.size.height = this.$el.clientHeight;
  }
};
</script>