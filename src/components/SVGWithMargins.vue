<template>
  <svg
    :width="actualWidth"
    :height="actualHeight"
    :viewBox="`
      ${-marginLeft}
      ${-marginTop}
      ${actualWidth}
      ${actualHeight}
    `"
  >
    <slot />
  </svg>
</template>

<script>
  export default {
    name: 'SVGWithMargins',
    props: {
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      marginTop: {
        type: Number,
        default: 0
      },
      marginRight: {
        type: Number,
        default: 0
      },
      marginBottom: {
        type: Number,
        default: 0
      },
      marginLeft: {
        type: Number,
        default: 0
      },
    },
    computed: {
      actualWidth() {
        return this.width + this.marginLeft + this.marginRight;
      },
      actualHeight() {
        return this.height + this.marginTop + this.marginBottom;
      },
    },
  }
</script>
