export default {
  name: "Point",
  props: {
    point: {
      type: Object,
      required: true
    }
  },
  inject: ["graph"],
  computed: {
    giraffe() {
      return this.graph.giraffe;
    },
    position() {
      return {
        x: this.point.x * this.giraffe.scale.x,
        y: this.point.y * this.giraffe.scale.y
      };
    },
    style() {
      return {
        position: "absolute",
        bottom: `${this.position.y}px`,
        left: `${this.position.x}px`
      };
    }
  },
  render() {
    return this.$scopedSlots.default({
      position: this.position,
      style: this.style
    })[0];
  }
};
