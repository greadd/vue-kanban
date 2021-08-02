import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import axios from 'axios'
const API_URL = 'https://trello.backend.tests.nekidaem.ru/api/v1'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: [],
    lists: [
      { id: '0', title: 'ON-HOLD' },
      { id: '1', title: 'IN-PROGRESS' },
      { id: '2', title: 'NEEDS-REVIEW' },
      { id: '3', title: 'APPROVED' },
    ],
  },
  mutations: {
    ADD_CARD(state, cardData) {
      state.cards.push(cardData)
    },

    MOVE_CARD(state, { cardId, fromListId, toListId, oldSeq_num, newSeq_num }) {
      const cards = state.cards
        .map((card) => {
          if (card.id == cardId) {
            card.row = toListId
            card.seq_num = newSeq_num
          }
          return card
        })
        .map((card) => {
          if (card.id != cardId) {
            if (fromListId === toListId) {
              if (card.seq_num > oldSeq_num && card.seq_num <= newSeq_num) {
                card.seq_num--
              } else if (
                card.seq_num >= newSeq_num &&
                card.seq_num < oldSeq_num
              ) {
                card.seq_num++
              }
            } else if (card.row === fromListId) {
              if (card.seq_num > oldSeq_num) {
                card.seq_num--
              }
            } else if (card.row === toListId) {
              if (card.seq_num >= newSeq_num) {
                card.seq_num++
              }
            }
          }
          return card
        })
        .sort((a, b) => {
          if (a.row === b.row) {
            return a.seq_num - b.seq_num
          } else return a.row - b.row
        })

      state.cards = cards
    },

    DELETE_CARD(state, cardId) {
      state.cards = state.cards.filter((card) => card.id !== cardId)
    },

    SET_CARDS(state, cards) {
      state.cards = cards
    },
  },
  actions: {
    async addCard({ commit, rootGetters }, payload) {
      const response = await axios.post(API_URL + '/cards/', payload, {
        headers: {
          Authorization: `JWT ${rootGetters.token}`,
        },
      })
      commit('ADD_CARD', response.data)
    },

    async moveCard(
      { commit, rootGetters },
      { cardId, fromListId, toListId, oldSeq_num, newSeq_num, text }
    ) {
      await axios.patch(
        API_URL + `/cards/${cardId}`,
        {
          row: toListId,
          seq_num: newSeq_num,
          text: text,
        },
        {
          headers: {
            Authorization: `JWT ${rootGetters.token}`,
          },
        }
      )
      commit('MOVE_CARD', {
        cardId,
        fromListId,
        toListId,
        oldSeq_num,
        newSeq_num,
      })
    },

    async deleteCard({ commit, rootGetters }, cardId) {
      await axios.delete(API_URL + `/cards/${cardId}/`, {
        headers: {
          Authorization: `JWT ${rootGetters.token}`,
        },
      })
      commit('DELETE_CARD', cardId)
    },

    async fetchCards({ commit, rootGetters }) {
      const response = await axios.get(API_URL + '/cards/', {
        headers: {
          Authorization: `JWT ${rootGetters.token}`,
        },
      })
      commit('SET_CARDS', response.data)
    },
  },
  modules: {
    auth,
  },
  getters: {
    lists: (state) => state.lists,

    getCardsByList: (state) => (listId) => {
      return state.cards.filter((card) => card.row === listId)
    },
  },
})
