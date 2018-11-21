const minSpacing = 30;

export default {
  name: "Grid",
  inject: ["graph"],
  computed: {
    giraffe() {
      return this.graph.giraffe;
    },
    y() {
      return this.generateLines(
        minSpacing,
        this.giraffe.scale.y,
        this.giraffe.height
      );
    },
    x() {
      return this.generateLines(
        minSpacing,
        this.giraffe.scale.x,
        this.giraffe.width
      );
    }
  },
  methods: {
    generateLines(minimum, scale, dimension) {
      // Calculate a multiple of our scaling factor that is
      // more than the minimum spacing size;'
      // debugger;
      const multiple = Math.round(minimum / scale);
      const spacing = multiple * scale;
      const number = dimension / spacing;

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
