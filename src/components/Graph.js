const minSpacing = 40;
const ROUND_TO_NEAREST = 2;

export default {
  name: 'Graph',
  props: {
    data: {
      type: Array,
      required: true,
    },
    width: Number,
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
        multiple: this.multiple,
        numberOfTicks: this.numberOfTicks,
        spacing: this.spacing,
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

      // Lock values to next highest multiple of 10
      x = Math.ceil(x / ROUND_TO_NEAREST) * ROUND_TO_NEAREST;
      y = Math.ceil(y / ROUND_TO_NEAREST) * ROUND_TO_NEAREST;

      return { x, y };
    },
    // How many pixels is equal to one value on the chart
    scale() {
      return {
        x: this.size.width / this.maxValues.x,
        y: this.size.height / this.maxValues.y,
      };
    },
    // The step each tick goes up
    multiple() {
      const minX = this.size.width / minSpacing;
      const multipleX = Math.ceil(this.maxValues.x / minX / ROUND_TO_NEAREST) * ROUND_TO_NEAREST;

      const minY = this.size.height / minSpacing;
      const multipleY = Math.ceil(this.maxValues.y / minY / ROUND_TO_NEAREST) * ROUND_TO_NEAREST;

      return { x: multipleX, y: multipleY };
    },
    numberOfTicks() {
      const x = Math.ceil(this.maxValues.x / this.multiple.x);
      const y = Math.ceil(this.maxValues.y / this.multiple.y);

      return { x, y };
    },
    // Spacing between graph ticks
    spacing() {
      return {
        x: this.size.width / this.numberOfTicks.x,
        y: this.size.height / this.numberOfTicks.y,
      }
    }
  },
  mounted() {
    // We can now populate our reactive object properly
    this.size.width = this.width || this.$el.clientWidth;
    this.size.height = this.$el.clientHeight;
  },
  render() {
    return this.$slots.default[0];
  }
};
