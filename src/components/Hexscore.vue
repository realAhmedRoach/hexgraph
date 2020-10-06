<template>
  <div id="hexscore" v-show="this.user.isEmerald" title="Hexscore">
    <p class="emerald-text">{{ hexscore }} <small>/ 600</small></p>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'hexscore',
  computed: {
    ...mapState([
      'classes',
      'user'
    ]),
    ...mapGetters([
      'statsByCode'
    ]),
    hexscore: function () {
      var score = 0
      for (var i = 0; i < this.classes.length; i++) {
        if (this.statsByCode(this.classes[i].code)) {
          // sum of stats
          score += this.statsByCode(this.classes[i].code).reduce((acc, cur) => acc + cur, 0)
        }
      }
      score /= this.classes.length
      return score
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 18px;
  text-align: center;
}
</style>
