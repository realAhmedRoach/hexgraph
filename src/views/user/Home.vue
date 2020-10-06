<template>
  <div id="class">
    <Hexscore></Hexscore>

    <div class="class-list">
      <span v-for="clss in classes" :key="clss.code"><router-link class="class-link" :to="{ name: 'clss', params: { classCode: clss.code }}">{{ clss.name }}</router-link></span>
    </div>

    <div>
      <button data-target="new-class" class="waves-effect waves-emerald btn-flat modal-trigger">New Class</button>
    </div>

    <div id="new-class" class="modal">
        <div class="modal-content">
          <h4 class="emerald-text">New Class</h4>
          <div class="input-field">
            <input type="text" class="form-control" name="newClassName" v-model="newClassName">
            <label for="newClassName">Class Name</label>
          </div>

          <div class="input-field">
            <input type="text" class="form-control" name="newClassCode" v-model="newClassCode">
            <label for="newClassCode">Class Code</label>
          </div>

          <select v-model="newClassTopic">
            <option disabled value="">Select the topic of this class</option>
            <option v-for="topic in topics" :value="topics.indexOf(topic)">{{ topic }}</option>
          </select>
        </div>
        <div class="modal-footer">
          <a href="#" class="modal-action modal-close waves-effect waves-red btn-flat">Cancel</a>
          <a href="#" class="modal-action modal-close waves-effect waves-emerald btn-flat" @click="addClass()">Create</a>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import firebase from 'firebase'
import Hexscore from '@/components/Hexscore'

export default {
  name: 'home',
  data: () => {
    return {
      newClassName: '',
      newClassCode: '',
      newClassTopic: -1
    }
  },
  beforeCreate () {
    if (this.$store.state.classes.length === 0) {
      this.$store.dispatch('getUserData')
    }
  },
  /* eslint-disable no-undef */
  mounted () {
    $('.modal').modal()
    $('select').material_select()

    // vue binds don't work with materialize select
    var vm = this
    $('select').on('change', function () {
      vm.newClassTopic = $('select').val()
    })
  },
  computed: mapState([
    'classes',
    'topics'
  ]),
  methods: {
    addClass: function () {
      if (this.newClassName && this.newClassCode && this.newClassTopic > -1) {
        this.$store.dispatch('addClass', {
          className: this.newClassName, classCode: this.newClassCode, classTopic: this.newClassTopic
        })
      }
    }
  },
  components: {
    Hexscore
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 42px;
}

#class {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.class-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

a.class-link {
  font-size: 24px;
}

.add-class {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

.add-btn {
  font-weight: 500;
}

.new-class-input {
  display: flex;
  flex-direction: row;
}

.new-class-input input {
  margin: 5px;
}

.form-control {
  padding: 5px;
}

</style>
