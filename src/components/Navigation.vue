<template>
  <div id="navigation">
    <nav class="transparent z-depth-0 container">
      <div class="nav-wrapper">
        <a href="#" data-activates="side" class="button-collapse show-on-med-and-down"><i class="material-icons black-text">menu</i></a>
        <ul class="side-nav hide-on-large-only" id="side">
          <li><router-link class="black-text" :to="{ name: 'auth', query: { u: 'student' } }">I'm a student</router-link></li>
          <li><router-link class="black-text" :to="{ name: 'auth', query: { u: 'teacher' } }">Login</router-link></li>
          <li><router-link class="waves-effect waves-emerald btn":to="{ name: 'auth', query: { u: 'new' } }">Sign Up</router-link></li>
        </ul>
        <a class="brand-logo center">Hexgraph</a>
        <ul class="right hide-on-med-and-down">
          <li><router-link class="black-text" :to="{ name: 'auth', query: { u: 'student' } }">I'm a student</router-link></li>
          <li><router-link class="black-text" :to="{ name: 'auth', query: { u: 'teacher' } }">Login</router-link></li>
          <li><router-link class="waves-effect waves-emerald btn":to="{ name: 'auth', query: { u: 'new' } }">Sign Up</router-link></li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'navigation',
  /* eslint-disable no-undef */
  mounted () {
    $('.button-collapse').sideNav()
  }
}
</script>
<style lang="scss" scoped>
.brand-logo {
  color: #26ffc4;
}

.btn {
  margin-left: 10px;
}

#navigation {
  width: 100%;
}

.navbar-fixed {
  position: absolute;
  z-index: 999999999;
}
</style>
