<template>
  <div class="board-wrapper">
    <List
      v-for="list in lists"
      :key="list.id"
      :id="list.id"
      :title="list.title"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import List from '../components/List.vue'
export default {
  name: 'Board',
  components: {
    List,
  },

  computed: {
    ...mapGetters(['token', 'lists']),
  },

  methods: {
    ...mapActions(['fetchCards']),
  },

  created() {
    this.fetchCards()
  },
}
</script>

<style scoped>
.board-wrapper {
  box-sizing: border-box;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
