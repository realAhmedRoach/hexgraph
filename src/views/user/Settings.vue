<template>
  <div id="settings" class="container">
    <div id="account">
      <h5>Account</h5>
      <p>Email: {{ email }}</p>

      <!-- <p>Change Password</p> -->
      <!-- TODO: Insert password change -->
    </div>
    <hr>
    <div id="classes">
      <h5>Classes</h5>

      <div v-for="clss in classes" :key="clss.key" class="class row">
        <p><b>Edit {{ clss.name }}</b></p>
        <p>Code: {{ clss.code }}</p>
        <div class="input-field">
          <input type="text" class="form-control" :id="'name' + clss.code" :value="clss.name">
          <label for="newClassName">Class Name</label>
        </div>
        <a @click="updateClass(clss.code)" class="btn-flat waves-effect waves-emerald">Update Name</a>
        <!-- TODO: Delete class -->
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'settings',
  data: () => ({
    email: firebase.auth().currentUser.email
  }),
  computed: {
    ...mapState(['classes'])
  },
  methods: {
    /* eslint-disable no-undef */
    updateClass (classCode) {
      firebase.database().ref(`/classes/${classCode}/name`).set($('#name' + classCode).val())
    }
  }
}
</script>

<style lang="scss" scoped>
#settings {
  display: flex;
  flex-direction: column;
}

.account, .classes {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 20px;
}

.class {
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
}

.input-field {
  width: 50%;
}
</style>
