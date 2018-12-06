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
  },
  render() {
    return this.$scopedSlots.default({
      position: this.position,
    })[0];
  }
};
