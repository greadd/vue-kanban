<template>
  <div class="list-wrapper">
    <div class="list">
      <div class="list__header">
        <div class="list__header-title">{{ title }}</div>
        <div class="list__header-cards" v-if="cardsList.length">
          {{ cardsList.length }}
        </div>
      </div>
      <Draggable
        class="list__cards"
        :data-id="id"
        group="cards"
        ghostClass="drop-zone"
        animation="200"
        @end="onDragEnd"
      >
        <Card
          v-for="card in cardsList"
          :key="card.id"
          :id="card.id"
          :text="card.text"
        />
      </Draggable>
      <div class="list__footer">
        <textarea
          class="card-text"
          placeholder="Enter card`s text"
          v-if="newCardFormVisible"
          v-model.trim="newCardText"
          @abort="newCardFormVisible = false"
        ></textarea>
        <div class="buttons">
          <button
            class="add-card-btn"
            :class="{ active: newCardFormVisible }"
            @click="onAddCard"
          >
            Add card
          </button>
          <button
            class="close-textarea-btn"
            :class="{ active: newCardFormVisible }"
            @click="newCardFormVisible = false"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import Draggable from 'vuedraggable'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'List',
  components: {
    Card,
    Draggable,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      newCardFormVisible: false,
      newCardText: '',
    }
  },

  computed: {
    ...mapGetters(['getCardsByList']),
    cardsList() {
      return this.getCardsByList(this.id)
    },
  },
  methods: {
    ...mapActions(['addCard', 'moveCard']),

    onAddCard() {
      if (this.newCardFormVisible && this.newCardText) {
        const cardData = { row: this.id, text: this.newCardText }
        this.addCard(cardData)
        this.newCardText = ''
      } else {
        this.newCardFormVisible = true
      }
    },

    onDragEnd(event) {
      const updateData = {
        cardId: parseInt(event.item.dataset.id),
        fromListId: event.from.dataset.id,
        toListId: event.to.dataset.id,
        oldSeq_num: event.oldIndex,
        newSeq_num: event.newIndex,
        text: this.cardsList.find((card) => card.id == event.item.dataset.id)
          .text,
      }

      this.moveCard(updateData)
    },
  },
}
</script>

<style scoped>
.list-wrapper {
  width: calc(25% - 1rem);
  margin: 0.5rem;
}
@media screen and (max-width: 1024px) {
  .list-wrapper {
    width: calc(50% - 1rem);
  }
}
@media screen and (max-width: 600px) {
  .list-wrapper {
    width: calc(100% - 1rem);
  }
}

.list {
  display: flex;
  flex-direction: column;
  background-color: #f1f2f6;
  border-radius: 6px;
}
.list__header {
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  min-height: 30px;
  padding: 8px 14px;
  margin-bottom: 8px;
  font-weight: 600;
  background-color: #7587ec;
  color: #fff;
}
.list__header-cards {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border-radius: 6px;
  width: 20px;
  color: #7587ec;
  background-color: #d5dcf9;
}
.list__cards {
  padding: 0 8px;
  min-height: 20px;
}
.list__footer {
  margin-top: 6px;
}

.card-text {
  resize: none;
  width: calc(100% - 16px);
  margin: 0 8px;
  border-radius: 6px;
  outline: none;
  border: none;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  min-height: 50px;
  max-height: 200px;
  padding: 6px 8px;
  transition: all 0.3s ease-in-out;
}
.card-text:focus {
  background-color: #d5dcf9;
}

.buttons {
  display: flex;
}

.add-card-btn,
.close-textarea-btn {
  padding: 8px;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  outline: none;
  background-color: #d5dcf9;
  color: #7587ec;
  cursor: pointer;
  border-radius: 6px;
  border: none;
}
.add-card-btn:hover {
  background-color: #7587ec;
  color: #fff;
}

.add-card-btn.active {
  color: #fff;
  background-color: #7587ec;
}
.add-card-btn.active:hover {
  color: #fff;
  background-color: #8a98ec;
}
.close-textarea-btn {
  display: none;
}
.close-textarea-btn.active {
  display: block;
}
</style>
