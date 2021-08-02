<template>
  <header>
    <span class="title">Kanban Board</span>
    <div class="user" v-if="user">
      <span class="username">{{ user }}</span>
      <button class="btn-header" @click="onLogout">Logout</button>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Header',
  props: {
    user: {
      type: String,
    },
  },

  methods: {
    ...mapActions(['logout']),

    onLogout() {
      this.logout()
    },
  },
}
</script>

<style scoped>
header {
  padding: 1rem;
  background-color: #7587ec;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.title {
  font-weight: bold;
  font-size: 1.4rem;
}
.btn-header {
  background-color: #d5dcf9;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  color: #7587ec;
  cursor: pointer;
  text-decoration: none;
  padding: 0.5rem;
  margin: 0 1rem;
  transition: all 0.3s ease-in-out;
}
.btn-header:hover {
  background-color: #fff;
}
</style>
