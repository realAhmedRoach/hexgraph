<template>
  <div id="clss">
    <!-- The class code and student link -->
    <p>
      Code: {{ $route.params.classCode }} - <a id="copy-link" v-clipboard:copy="'https://hexgraph.co/students/' + $route.params.classCode"
      v-clipboard:success="onCopy">
        {{ linkText }}
      </a>
    </p>

    <p class="last-input">Last Input: {{ lastInput }}</p>

    <Graph v-if="classByCode($route.params.classCode).studentInput" :stats="statsByCode($route.params.classCode)"></Graph>

    <p id="lowest" class="red-text" v-if="classByCode($route.params.classCode).studentInput && this.lowest.label != this.highest.label">
      The lowest stat is {{ this.lowest.label }}
    </p>

    <p id="tip" v-if="classByCode($route.params.classCode).studentInput && this.lowest.label != this.highest.label">
      {{ this.lowest.tip }}
    </p>

    <p id="highest" class="green-text" v-if="classByCode($route.params.classCode).studentInput && this.lowest.label != this.highest.label">
      The highest stat is {{ this.highest.label }}
    </p>
  </div>
</template>

<script>
import Graph from '@/components/Graph'
import { mapState, mapGetters } from 'vuex'
import { timestamp } from '@/helpers/time'

export default {
  name: 'clss',
  data: () => ({
    linkText: 'Copy Student Link'
  }),
  computed: {
    lowest: function () {
      var lowest = Math.min(...this.statsByCode(this.$route.params.classCode))
      var stat = this.statsByCode(this.$route.params.classCode).indexOf(lowest)
      return this.metrics[stat]
    },
    highest: function () {
      var highest = Math.max(...this.statsByCode(this.$route.params.classCode))
      var stat = this.statsByCode(this.$route.params.classCode).indexOf(highest)
      return this.metrics[stat]
    },
    lastInput: function () {
      let keys = Object.keys(this.allStats(this.$route.params.classCode))
      keys.sort((a, b) => timestamp(a) - timestamp(b))

      return new Date(timestamp(keys[keys.length - 1])).toDateString()
    },
    ...mapState([
      'metrics'
    ]),
    ...mapGetters([
      'statsByCode',
      'classByCode',
      'allStats'
    ])
  },
  methods: {
    onCopy () {
      this.linkText = 'Student Link Copied!'
    }
  },
  components: {
    Graph
  }
}
</script>

<style lang="scss" scoped>
#back-button {
  color: #2c3e50;
}

p {
  text-align: center;
}

.last-input {
  font-size: 8pt;
  padding-bottom: 10pt;
}

#copy-link {
  cursor: pointer;
}
</style>
