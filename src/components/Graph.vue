<template>
  <vue-chart id="graph" type="radar" :data="{ labels: this.labels, datasets: [{ data: this.stats, backgroundColor: 'rgba(38, 255, 196, 0.65)' }] }" :options="{
      legend: {
        display: false
      },
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 10,
          display: false
        }
      }
    }"></vue-chart>
</template>

<script>
import { mapState } from 'vuex'
import VueChart from 'vue-chart-js'

export default {
  props: ['stats'],
  name: 'Graph',
  computed: {
    ...mapState(['metrics']),
    labels: function () {
      var labels = []
      for (var i in this.metrics) {
        labels.push(this.metrics[i].label)
      }
      return labels
    }
  },
  components: {
    VueChart
  }
}
</script>

<style lang="scss" scoped>
vue-chart {
  display: block;
  margin: auto;
}
</style>
