export default {
  name: "Grid",
  inject: ["graph"],
  computed: {
    giraffe() {
      return this.graph.giraffe;
    },
    y() {
      return this.generateLines(
        this.giraffe.numberOfTicks.y,
        this.giraffe.spacing.y,
        this.giraffe.multiple.y
      );
    },
    x() {
      return this.generateLines(
        this.giraffe.numberOfTicks.x,
        this.giraffe.spacing.x,
        this.giraffe.multiple.x
      );
    }
  },
  methods: {
    generateLines(number, spacing, multiple) {
      const lines = [];
      for (let i = 0; i <= number; i++) {
        lines.push({
          offset: i * spacing,
          value: i * multiple
        });
      }
      return lines;
    }
  },
  render(h) {
    return h("div", {}, this.$scopedSlots.default({ x: this.x, y: this.y }));
  }
};
