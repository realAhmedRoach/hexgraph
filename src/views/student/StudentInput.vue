<template>
  <div class="student-input">
    <Graph :stats="values"></Graph>
    <div v-if="index < metrics.length" class="stat container">
      <div class="question">{{ metrics[index].question }}</div>
      <div class="input-div">
        <label class="label">{{ metrics[index].label }}</label>
        <span class="range-field">
          <input class="input" type="range" v-model.number="values[index]" min="0" max="100">
        </span>
        <span class="value">{{ values[index] }}</span>
      </div>
    </div>
    <div class="feeling" v-else>
      <p id="feeling-question">Which choice best represents what you feel in this class?</p>
      <form>
        <p v-for="(feeling, index) in feelings" :key="index">
          <input :name="feeling" :value="index" type="radio" :id="feeling" v-model="picked" />
          <label :for="feeling">{{ feeling }}</label>
        </p>
      </form>
    </div>


    <button id="back" class="waves-effect waves-emerald btn-flat" type="button" v-if="index > 0" @click="index--" name="back">
      Back
    </button>

    <button id="submit" class="waves-effect waves-light btn" type="button" @click="submitData()" name="submit">
      {{ index === this.measure ? 'Submit' : 'Next' }}
    </button>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import firebase from 'firebase'
import Graph from '@/components/Graph'

export default {
  name: 'student-input',
  data: () => ({
    feelings: ['Inhibited', 'Overwhelmed', 'Bored', 'Energized'],
    picked: -1,

    values: [100, 100, 100, 100, 100, 100],
    index: 0
  }),
  computed: {
    classCode: function () {
      return this.$route.params.classCode
    },
    measure: function () {
      return firebase.auth().currentUser ? this.metrics.length - 1 : this.metrics.length
    },
    ...mapState([
      'metrics',
      'classes'
    ]),
    ...mapGetters(['getTopic'])
  },
  methods: {
    submitData () {
      if (this.index < this.measure) {
        this.index++
        return
      }
      this.$store.dispatch('addToStudentInput', {
        classCode: this.classCode, newInput: this.values
      })
      if (this.picked !== -1) {
        var topic = this.getTopic(this.classCode)
        this.$store.dispatch('addToData', {
          input: this.values,
          output: this.picked,
          topic: topic
        })
      }
      this.$router.push({ name: 'student-sucess' })
    }
  },
  components: {
    Graph
  }
}
</script>

<style lang="scss" scoped>
div.student-input, div.stat, div.input-div, div.feeling {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

div.input-div {
  flex-direction: row;
}

div.question {
  font-size: 16px;
  padding-top: 10px;
}

#feeling-question {
  text-align: center;
}

.label {
  text-align: right;
}

.value {
  margin-left: 10px;
  text-align: right;
  width: 20px;
}

.range-field {
  margin-left: 10px;
  width: 300px;
}

#submit, #back {
  margin: 10px;
  width: 50%;
}

#back {
  margin-top: 10px;
}
</style>
