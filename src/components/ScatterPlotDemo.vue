<template>
  <Graph :data="points" class="scatter-plot">
    <div>
      <Grid>
        <template slot-scope="{ x, y }">
          <div>
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
            <template v-for="({ offset, value }, index) in x">
              <div
                class="line line--y"
                :style="{ left: `${offset}px` }"
                :key="`${index}-line-y`"
              />
              <span
                class="marker marker--y"
                :key="`${index}-marker-y`"
                :style="{ left: `${offset - 15}px` }"
              >
                {{ value }}
              </span>
            </template>
          </div>
        </template>
      </Grid>
      <Point
        v-for="({ x, y, id }) in points"
        :point="{ x, y }"
        :key="id"
      >
        <template slot-scope="{ position, style }">
          <div
            class="point"
            :style="{
              bottom: `${position.y}px`,
              left: `${position.x}px`
            }"
            :id="`${x}-${y}`"
          />
        </template>
      </Point>
    </div>
  </Graph>
</template>

<script>
import Graph from './Graph';
import Grid from './Grid';
import Point from './Point';

const points = [];
const scale = (Math.round(Math.random() * 100) + 5) * 10;
for (let i = 0; i < 100; i++) {
  points.push({
    id: i,
    x: Math.round(Math.random() * scale),
    y: Math.round(Math.random() * scale) / 2,
  });
}

export default {
  components: {
    Graph,
    Grid,
    Point,
  },
  data() {
    return { points };
  }
};
</script>

<style scoped>
.scatter-plot {
  width: 600px;
  height: 300px;
  margin-bottom: 100px;
  position: relative;
}
.line {
  position: absolute;
  background: #DDD;
}

.line:first-of-type,
.line--y {
  background: #999;
}

.line--x {
  width: 100%;
  height: 1px;
}

.line--y {
  height: 10px;
  width: 1px;
  bottom: -10px;
}

.marker {
  position: absolute;
  width: 30px;
}

.marker--x {
  text-align: right;
  left: -40px;
}

.marker--y {
  text-align: center;
  bottom: -35px;
}

.point {
  position: absolute;
  margin-left: -5px;
  margin-bottom: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 0, 0, 0.5);
  transition: all 0.15s ease-out;
}

.point:hover {
  margin-left: -10px;
  margin-bottom: -10px;
  width: 20px;
  height: 20px;
}
</style>
