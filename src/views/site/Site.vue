<template>
  <div id="site" class="container">

    <div class="copy container">
      <h3 id="uvp">{{ uvp }}</h3>
      <h5 id="mft">{{ mft }}</h5>
    </div>

    <div class="demo hide-on-med-and-down">
      <Graph :stats="stats"></Graph>
    </div>

    <router-link id="cta" class="waves-effect waves-light btn-large pulse" :to="{ name: 'auth', query: { u: 'new' } }">{{ cta }}</router-link>
    <p>or</p>
    <router-link id="learn-more" class="waves-effect waves-emerald btn-flat":to="{ name: 'how-it-works' }">Learn more</router-link>

    <p>
      <router-link :to="{ name: 'emerald' }">Check out Hexgraph Emerald</router-link>
    </p>
  </div>
</template>

<script>
import Graph from '@/components/Graph'
import Navigation from '@/components/Navigation'

export default {
  name: 'site',
  data: () => ({
    uvp: 'What if you could see what your students feel?',
    mft: 'Hexgraph allows you to see a visual representation of what your students feel during your classes and gives you insights into how you can improve.',
    cta: 'Get Started'
  }),
  computed: {
    stats: function () {
      var stats = []
      var min = 10
      var max = 100
      for (var i = 0; i < 6; i++) {
        stats.push(Math.floor(Math.random() * (max - min)) + min)
      }
      return stats
    }
  },
  components: {
    Graph,
    Navigation
  }
}
</script>

<style lang="scss" scoped>
#site {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#uvp, #mft {
  text-align: center;
  padding-bottom: 10px;
  width: 80%;
}

p {
  text-align: center;
}

#mft {
  font-size: 20px;
  line-height: 20pt;
}

.demo {
  padding: 10px;
}

#cta {
  margin-top: 10px;
}

</style>
