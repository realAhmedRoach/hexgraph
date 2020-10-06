<template>
  <div id="hexperiment">
    <p><b>Metric:</b> {{ this.metric }} &bull; <b>Action:</b> {{ this.action }}</p>
    <p v-if="!isDone">Time Left: {{ timeLeft }}</p>
    <p v-else>Previously, <u>{{ metric.toLowerCase() }}</u> was at {{ results['previous'] }}, but during your experiment, it became {{ results['current'] }}. Your students' <u>{{ metric.toLowerCase() }}</u> has <b :class="improved ? 'green-text': 'red-text'">{{ improved ? 'improved' : 'declined' }}</b> as a result of your experiment{{ improved ? '!': '.' }}</p>
  </div>
</template>
<script>
import firebase from 'firebase'
import { mapState, mapGetters } from 'vuex'
import * as time from '@/helpers/time'

export default {
  name: 'hexperiment',
  props: ['metric', 'action', 'start', 'end', 'classes'],
  computed: {
    ...mapState(['metrics']),
    ...mapGetters(['allStats']),
    isDone: function () {
      return this.end < Date.now()
    },
    timeLeft: function () {
      return time.weeksAndDays(this.end - Date.now())
    },
    results: function () {
      if (!this.isDone) {
        return null
      }
      var startEval = this.start - (this.end - this.start) // the start of the evaluation
      var endEval = this.start // end the evaluation at the start of the experiment

      var studentInput = {}
      for (var i = 0; i < this.classes.length; i++) {
        var clss = this.allStats(this.classes[i])
        for (let key in clss) {
          studentInput[key] = clss[key]
        }
      }

      var metricIndex = this.metrics.indexOf(this.metrics.find(metric => metric.label === this.metric))

      var previous = []
      for (let key in studentInput) {
        let timestamp = time.timestamp(key)

        console.log((timestamp < endEval && timestamp > startEval) + ': ' + studentInput[key][metricIndex])
        if (timestamp < endEval && timestamp > startEval) {
          previous.push(studentInput[key][metricIndex])
        }
      }
      var previousEval = previousEval = previous.reduce((sum, value) => sum + value) / previous.length

      var current = []
      for (let key in studentInput) {
        let timestamp = time.timestamp(key)

        if (timestamp < this.end && timestamp > this.start) {
          current.push(studentInput[key][metricIndex])
        }
      }
      var currentEval = current.reduce((sum, value) => sum + value) / current.length
      return { 'previous': previousEval, 'current': currentEval }
    },
    improved: function () {
      return this.results['current'] > this.results['previous']
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
