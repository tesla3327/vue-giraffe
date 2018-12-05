<template>
  <div>
    <BarGraphDemo />
    <!-- <ScatterPlotDemo /> -->
  </div>
</template>

<script>
import ScatterPlotDemo from './ScatterPlotDemo';
import BarGraphDemo from './BarGraphDemo';

export default {
  components: {
    ScatterPlotDemo,
    BarGraphDemo,
  }
}
</script>

<style>
.graph-container {
  margin-bottom: 100px;
}
</style>