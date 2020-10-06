<template>
  <div id="hexprogress" v-show="this.user.isEmerald">
    <vue-chart class="graph" type="line" :data="{ labels: this.labels, datasets: this.hexscore }" :options="this.optionsHexscore"></vue-chart>

    <vue-chart class="graph" type="line" :data="{ labels: this.labels, datasets: this.datasets }" :options="this.optionsMetrics"></vue-chart>
  </div>
</template>
<script>
import VueChart from 'vue-chart-js'
import { mapState, mapGetters } from 'vuex'
import * as time from '@/helpers/time'

export default {
  name: 'hexprogress',
  props: {
    'code': {
      default: function () {
        return null
      }
    }
  },
  data: () => ({
    numWeeks: 0,
    extraWeeks: 0,
    optionsMetrics: {
      title: {
        display: true,
        text: 'Hexprogress',
        fontFamily: 'Roboto'
      },
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            stepSize: 10,
            beginAtZero: true,
            max: 101
          }
        }],
        xAxes: [{
          stacked: false,
          beginAtZero: true,
          scaleLabel: {
            labelString: 'Week'
          },
          ticks: {
            autoSkip: false
          }
        }]
      }
    },
    optionsHexscore: {
      title: {
        display: true,
        text: 'Hexscore',
        fontFamily: 'Roboto'
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          top: 5
        }
      },
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            stepSize: 60,
            beginAtZero: true,
            max: 601
          }
        }],
        xAxes: [{
          stacked: false,
          beginAtZero: true,
          scaleLabel: {
            labelString: 'Week'
          },
          ticks: {
            autoSkip: false
          }
        }]
      }
    }

  }),
  methods: {
    getHistory: function () {
      let weeksArray = []
      let studentInput = this.allStats(this.code)

      let keys = Object.keys(studentInput)
      keys.sort((a, b) => time.timestamp(a) - time.timestamp(b))

      let start = time.timestamp(keys[0])
      let end = time.timestamp(keys[keys.length - 1])
      let totalDuration = end - start
      this.numWeeks = Math.round(totalDuration / time.weekmillis)

      for (var i = 0; i < this.numWeeks; i++) {
        let weekStart = start + (time.weekmillis * i)
        let weekEnd = start + (time.weekmillis * (i + 1))
        let currentWeek = []

        for (let key of keys) {
          let timestamp = time.timestamp(key)
          if (timestamp >= weekStart && timestamp <= weekEnd) {
            currentWeek.push(studentInput[key])
          }
        }
        if (currentWeek.length > 0) weeksArray.push(currentWeek)
        else this.extraWeeks++
      }

      for (let j = 0; j < weeksArray.length; j++) {
        weeksArray[j] = this.statsByInput(weeksArray[j]) // the averages
      }

      this.history = weeksArray
    }
  },
  computed: {
    ...mapState(['classes', 'metrics', 'user']),
    ...mapGetters(['allStats', 'statsByInput']),
    labels: function () {
      // let labels = []
      // for (let i = 0; i < this.metrics.length; i++) {
      //   labels.push(this.metrics[i].label)
      // }
      // return labels
      if (!this.history) this.getHistory()

      let labels = []

      for (let i = 0; i < this.numWeeks - this.extraWeeks; i++) {
        labels.push('Week #' + (i + 1))
      }
      return labels
    },
    datasets: function () {
      if (!this.history) this.getHistory()

      let metricData = []

      for (let i = 0; i < this.metrics.length; i++) {
        let values = []
        this.history.forEach(val => values.push(val[i]))
        let newData = {}
        newData.label = this.metrics[i].label
        newData.data = values
        newData.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
        newData.fill = false
        metricData.push(newData)
      }

      return metricData
    },
    hexscore: function () {
      if (!this.history) this.getHistory()

      let values = []
      this.history.forEach(val => values.push(val.reduce((a, b) => a + b)))
      let data = {}
      data.label = 'Hexscore'
      data.data = values
      data.backgroundColor = '#26ffc4'
      data.fill = false

      return [data]
    }
  },
  components: {
    VueChart
  }
}
</script>
<style lang="scss" scoped>
#hexprogress {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.graph {
  width: 500px;
}
</style>
