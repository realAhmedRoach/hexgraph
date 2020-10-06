<template>
  <div id="experiments">
    <div class="experiment card-panel" v-for="experiment in experiments" :key="experiment.key">
      <Hexperiment :metric="experiment.metric" :action="experiment.action" :start="experiment.start" :end="experiment.end" :classes="experiment.classes"></Hexperiment>
      <button class="btn-flat waves-effect waves-emerald red-text delete" @click="deleteExperiment(experiments.indexOf(experiment))">Delete Experiment</button>
    </div>
    <div id="new-experiment" class="modal">
        <div class="modal-content">
          <h4 class="emerald-text">New Experiment</h4>
          <select v-model="newExperimentMetric">
            <option disabled value="">Select the metric you want to monitor</option>
            <option v-for="metric in metrics" :value="metric.label">{{ metric.label }}</option>
          </select>

          <div class="input-field">
            <input type="text" class="form-control" name="newExperimentAction" v-model="newExperimentAction">
            <label for="newExperimentAction">How do you plan to improve that metric?</label>
          </div>

          <p>Choose the classes you want to monitor:</p>
          <p v-for="clss in classes">
            <input type="checkbox" :id="clss.code" v-model="newExperimentClasses" :value="clss.code" />
            <label :for="clss.code">{{ clss.name }}</label>
          </p>
        </div>
        <div class="modal-footer">
          <a href="#" class="modal-action modal-close waves-effect waves-red btn-flat">Cancel</a>
          <a href="#" class="modal-action modal-close waves-effect waves-emerald btn-flat" @click="newExperiment()">Create</a>
        </div>
    </div>
    <div>
      <button data-target="new-experiment" class="waves-effect waves-emerald btn-flat modal-trigger">New Experiment</button>
    </div>
  </div>
</template>

<script>
import Hexperiment from '@/components/Hexperiment'
import firebase from 'firebase'
import { mapState } from 'vuex'
import { weekmillis } from '@/helpers/time'

export default {
  name: 'experiments',
  created () {
    this.load()
  },
  computed: {
    ...mapState(['metrics', 'classes'])
  },
  data: () => ({
    experiments: [],
    keys: [],
    newExperimentMetric: '',
    newExperimentAction: '',
    newExperimentClasses: []
  }),
  methods: {
    load () {
      this.experiments = []
      this.keys = []

      var db = firebase.database()
      var uid = firebase.auth().currentUser.uid
      var ref = db.ref(`/teachers/${uid}/experiments`)
      var vm = this
      ref.once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          vm.experiments.push(child.val())
          vm.keys.push(child.key)
        })
      })
    },
    newExperiment () {
      if (this.newExperimentMetric && this.newExperimentAction && this.newExperimentClasses) {
        var db = firebase.database()
        var uid = firebase.auth().currentUser.uid
        var ref = db.ref(`/teachers/${uid}/experiments`).push()
        ref.set({
          metric: this.newExperimentMetric,
          action: this.newExperimentAction,
          start: Date.now(),
          end: Date.now() + weekmillis,
          classes: this.newExperimentClasses
        })
      }
    },
    deleteExperiment (index) {
      var uid = firebase.auth().currentUser.uid
      var ref = firebase.database().ref(`/teachers/${uid}/experiments/${this.keys[index]}`)
      ref.set(null)

      this.experiments.splice(index, 1)
    }
  },
  /* eslint-disable no-undef */
  mounted () {
    $('.modal').modal()
    $('select').material_select()

    // vue binds don't work with materialize select
    var vm = this
    $('select').on('change', function () {
      vm.newExperimentMetric = $('select').val()
    })
  },
  components: {
    Hexperiment
  }
}
</script>

<style lang="scss" scoped>
#experiments {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.experiment {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
}

.delete {
  font-weight: 600;
  font-size: 10pt;
}
</style>
