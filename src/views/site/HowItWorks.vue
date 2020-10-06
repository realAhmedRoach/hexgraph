<template>
  <div id="how-it-works" class="container">
    <h1>How It Works</h1>
    <p class="speed">Get started in minutes.</p>

    <div class="row">
      <div class="icon col m4">
        <i class="material-icons">{{ features[0].icon }}</i>
      </div>
      <div class="col m8">
        <h4>{{ features[0].title }}</h4>
        <p>{{ features[0].explanation }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col m8">
        <h4>{{ features[1].title }}</h4>
        <p>{{ features[1].explanation }}</p>
      </div>
      <div class="icon col m4">
        <i class="material-icons">{{ features[1].icon }}</i>
      </div>
    </div>

    <div class="row">
      <div class="icon col m4">
        <i class="material-icons">{{ features[2].icon }}</i>
      </div>
      <div class="col m8">
        <h4>{{ features[2].title }}</h4>
        <p>{{ features[2].explanation }}</p>
      </div>
    </div>

    <p id="emerald"><router-link :to="{ name: 'emerald' }">Need more? Check out Hexgraph Emerald.</router-link></p>

    <p><router-link id="cta" class="waves-effect waves-light btn-large" :to="{ name: 'auth' }">{{ cta }}</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'how-it-works',
  data: () => ({
    cta: 'Get Started',
    features: [
      {
        icon: 'link',
        title: 'Share the student link',
        explanation: 'Give the student link to your students and we\'ll ask them six simple questions and gather the results for you. You\'ll be done in a minute.'
      },
      {
        icon: 'data_usage',
        title: 'Watch the results come in',
        explanation: 'Once your students submit their responses, a graph on the class page will show how your students feel. Look for trends and see where you can improve.'
      },
      {
        icon: 'show_chart',
        title: 'Know what to focus on',
        explanation: 'We also give you your highest and lowest stats, so you can see what to focus on. Try different techniques in the classroom to improve your score and progress.'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
#how-it-works {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#emerald {
  font-size: 18px;
  text-align: center;
}

h1 {
  text-align: center;
  margin-bottom: 0px;
}

p.speed {
  font-size: 16pt;
  margin-bottom: 25px;
}

i.material-icons {
  font-size: 8rem;
}

.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.row {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-large {
  margin-bottom: 10px;
}
</style>
