<template>
  <Graph
    :data="points"
    :width="width"
  >
    <div class="bar-graph">

      <!-- SVG -->
      <svg
        :width="width + marginLeft + marginRight"
        :height="height + marginTop + marginBottom"
        :viewBox="`
          ${-marginLeft}
          ${-marginTop}
          ${width + marginLeft + marginRight}
          ${height + marginTop + marginBottom}
        `"
      >
        <Grid>
          <template slot-scope="{ x, y }">
            <g>
              <path
                v-for="({ offset, value }, index) in y"
                class="line line--x"
                :d="`M 0 ${height - offset}, L ${width} ${height - offset}`"
                :key="`${index}-line-x`"
              />
              <text
                v-for="({ offset, value }, index) in y"
                class="marker marker--x"
                text-anchor="end"
                :key="`${index}-marker-x`"
                :x="-10"
                :y="height - offset"
              >
                {{ value }}
              </text>
            </g>
          </template>
        </Grid>
        <Point
          v-for="({ x, y, id }, index) in points"
          :point="{ x, y }"
          :key="id"
        >
          <template slot-scope="{ position, style }">
            <g>
              <rect
                class="bar"
                :height="position.y"
                :y="height - position.y"
                :x="position.x + 25"
                :id="`${x}-${y}`"
              />
              <text
                class="label"
                text-anchor="middle"
                :key="`${index}-label-y`"
                :x="position.x + 50"
                :y="height + 20"
              >
                {{ labels[index] }}
              </text>
            </g>
          </template>
        </Point>

      </svg>

      <!-- Add in a cool gradient -->
      <svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
        <linearGradient id="gradient" x2="0" y2="1">
          <stop offset="0%" stop-color="#447799" />
          <stop offset="100%" stop-color="#224488" />
        </linearGradient>
      </svg>

    </div>
  </Graph>
</template>

<script>
import Graph from './Graph';
import Grid from './Grid';
import Point from './Point';

const points = [];
const scale = (Math.round(Math.random() * 100) + 5) * 10;
for (let i = 0; i < 8; i++) {
  points.push({
    id: i,
    x: i,
    y: Math.round(Math.random() * scale) / 2,
  });
}

const labels = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten'
];

export default {
  components: {
    Graph,
    Grid,
    Point,
  },
  data() {
    return {
      points,
      labels,
      height: 300,
      width: 600,
      marginLeft: 50,
      marginRight: 0,
      marginTop: 20,
      marginBottom: 30,
    };
  }
};
</script>

<style scoped>
.bar-graph {
  width: 100%;
  height: 300px;
  margin-bottom: 100px;
  position: relative;
}

svg {
  width: 100%;
}

.label {
  width: 500px;
  font-weight: bold;
  fill: #224488;
}

.line {
  position: absolute;
  stroke: #DDD;
}

.line:first-of-type {
  background: #999;
}

.line--x {
  width: 100%;
  height: 1px;
}

.marker {
  position: absolute;
  fill: #2c3e50;
}

.marker--x {
  text-align: right;
  left: -40px;
}

.bar {
  width: 50px;
  fill: url(#gradient) #447799;
}
</style>
