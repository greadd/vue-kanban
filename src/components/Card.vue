<template>
  <div class="list__card" :data-id="id">
    <div class="list__card-details">
      <div class="list__card-text">
        {{ text }}
      </div>
      <button class="delete-btn" type="button" @click="deleteCard(id)">
        X
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Card',

  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters(['cards']),
  },

  methods: {
    ...mapActions(['deleteCard']),
  },
}
</script>

<style scoped>
.list__card {
  border-radius: 6px;
  background-color: #fff;
  margin-bottom: 8px;
  min-height: 20px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  cursor: pointer;
}
.list__card:hover {
  background-color: #d5dcf9;
}

.list__card-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
}
.list__card-text {
  text-decoration: none;
  color: #172b4d;
  word-break: break-all;
}
.delete-btn {
  cursor: pointer;
  font-weight: bold;
  border-radius: 6px;
  height: 20px;
  outline: none;
  border: none;
  color: #d5dcf9;
  background-color: rgb(255, 255, 255);
  transition: all 0.3s ease-in-out;
}
.delete-btn:hover {
  background-color: rgb(255, 134, 134);
  color: #fff;
}
.drop-zone {
  border: 2px dashed #7587ec;
  background-color: #d5dcf9;
}
</style>
