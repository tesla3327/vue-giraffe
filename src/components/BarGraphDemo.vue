<template>
  <Graph
    :data="points"
    :width="width"
  >
    <div class="bar-graph">

      <!-- SVG -->
      <svg
        :width="width + offsetX"
        :height="height"
        :viewBox="`0 0 ${width + offsetX} ${height}`"
      >
        <Grid>
          <template slot-scope="{ x, y }">
            <g>
              <path
                v-for="({ offset, value }, index) in y"
                class="line line--x"
                :d="`M ${offsetX} ${height - offset}, L ${width + offsetX} ${height - offset}`"
                :key="`${index}-line-x`"
              />
              <text
                v-for="({ offset, value }, index) in y"
                class="marker marker--x"
                text-anchor="end"
                :key="`${index}-marker-x`"
                :x="offsetX - 10"
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
                :x="position.x + 25 + offsetX"
                :id="`${x}-${y}`"
              />
              <text
                class="label"
                text-anchor="middle"
                :key="`${index}-label-y`"
                :x="position.x + offsetX + 50"
                :y="height"
              >
                {{ labels[index] }}
              </text>
            </g>
          </template>
        </Point>

      </svg>

      <!-- Div -->
      <!-- <div>
        <Grid>
          <template slot-scope="{ x, y }">
            <div>
              <span
                v-for="({ offset, value }, index) in y"
                class="marker marker--x"
                :key="`${index}-marker-x`"
                :style="{ bottom: `${offset - 10}px` }"
              >
                {{ value }}
              </span>
            </div>
          </template>
        </Grid>

        <Point
          v-for="({ x, y, id }, index) in points"
          :point="{ x, y }"
          :key="id"
        >
          <template slot-scope="{ position, style }">
            <div>
              <span
                class="label"
                :key="`${index}-label-y`"
                :style="{
                  left: `${position.x - 250 + 50 + offsetX}px`
                }"
              >
                {{ labels[index] }}
              </span>
            </div>
          </template>
        </Point>
      </div> -->

    </div>
  </Graph>
</template>

<script>
import Graph from './Graph';
import Grid from './Grid';
import Point from './Point';

const points = [];
const scale = (Math.round(Math.random() * 100) + 5) * 10;
for (let i = 0; i < 5; i++) {
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
      offsetX: 50,
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
  fill: white;
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
  fill: steelblue;
}
</style>
