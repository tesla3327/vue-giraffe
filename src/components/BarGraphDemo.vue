<template>
  <Graph class="bar-graph" :data="points">
    <Grid>
      <template slot-scope="{ x, y }">
        <template v-for="({ offset, value }, index) in y">
          <div
            class="line line--x"
            :style="{ bottom: `${offset}px` }"
            :key="`${index}-line-x`"
          />
          <span
            class="marker marker--x"
            :key="`${index}-marker-x`"
            :style="{ bottom: `${offset - 10}px` }"
          >
            {{ value }}
          </span>
        </template>
      </template>
    </Grid>
    <Point
      v-for="({ x, y, id }, index) in points"
      :point="{ x, y }"
      :key="id"
    >
      <template slot-scope="{ position, style }">
        <div>
          <div
            class="bar"
            :style="{
              left: `${position.x + 25}px`,
              top: `${position.y}px`,
            }"
            :id="`${x}-${y}`"
          />
          <span
            class="label"
            :key="`${index}-label-y`"
            :style="{
              left: `${position.x - 250 + 50}px`
            }"
          >
            {{ labels[index] }}
          </span>
        </div>
      </template>
    </Point>
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
    return { points, labels };
  }
};
</script>

<style scoped>
.bar-graph {
  width: 600px;
  height: 300px;
  margin-bottom: 100px;
  position: relative;
}

.label {
  position: absolute;
  bottom: -30px;
  text-align: center;
  width: 500px;
  font-weight: bold;
}

.line {
  position: absolute;
  background: #DDD;
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
  width: 30px;
}

.marker--x {
  text-align: right;
  left: -40px;
}

.bar {
  position: absolute;
  bottom: 0;
  width: 50px;
  background: steelblue;
}
</style>
