import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'
import { CardInterface } from '../interfaces/Card'
import apiService from '../services/api.service'

Vue.use(Vuex)

function getCards (destination: string, context: ActionContext<{ cards: CardInterface[]; alert: string }, {
  cards: CardInterface[];
  alert: string;
}>) {
  switch (destination) {
    case 'localStorage':
      if (localStorage) {
        try {
          return localStorage.getItem('card-items')
        } catch (e) {
          context.commit('showError', `Error occured: ${e.message}`)
          return '[]'
        }
      } else {
        context.commit('showError', 'Your browser does not support localStorage')
        return '[]'
      }
    case 'heroku':
      return apiService.fetchUserCards()
        .then(res => {
          return res
        })
        .catch(error => {
          context.commit('showError', `Error occured: ${error.message}`)
          return []
        })
    default:
      context.commit('showError', 'Error getting cards')
      return []
  }
}

function saveCards (destination: string, cards: CardInterface[], card: any, context: ActionContext<{ cards: CardInterface[]; alert: string }, {
  cards: CardInterface[];
  alert: string;
}>) {
  switch (destination) {
    case 'localStorage':
      if (localStorage) {
        try {
          localStorage.setItem('card-items', JSON.stringify(cards))
        } catch (e) {
          context.commit('showError', `Error occured: ${e.message}`)
        }
      } else {
        context.commit('showError', 'Error occured: Your browser does not support localStorage. This app will not work')
      }
      break
    case 'heroku_create':
      return apiService.createCard(card.title, card.description)
        .then(res => {
          if (localStorage) {
            try {
              localStorage.setItem(res._id, card.parentColumn)
            } catch (e) {
              context.commit('showError', `Error occured: ${e.message}`)
            }
          } else {
            context.commit('showError', 'Error occured: Your browser does not support localStorage. This app will not work')
          }
          return res
        })
        .catch(error => {
          context.commit('showError', `Error occured: ${error.message}`)
          return []
        })
    case 'heroku_update':
      return apiService.updateCard(card.card.id, card.card.title, card.card.text)
        .then(res => {
          if (localStorage) {
            try {
              localStorage.removeItem(card.card.id)
              localStorage.setItem(res._id, card.card.parentColumn)
            } catch (e) {
              context.commit('showError', `Error occured: ${e.message}`)
            }
          } else {
            context.commit('showError', 'Error occured: Your browser does not support localStorage. This app will not work')
          }
          return res
        })
        .catch(error => {
          context.commit('showError', `Error occured: ${error.message}`)
          return []
        })
    default:
      context.commit('showError', 'Error occured: cards are not saved')
  }
}

export default new Vuex.Store({
  state: {
    cards: Array<CardInterface>(),
    alert: '',
    columns: Array<string>()
  },
  mutations: {
    clear (state) {
      state.cards.splice(0)
    },
    saveCardsFromLocalStorage (state, payload) {
      payload.forEach((el: CardInterface) => state.cards.push(el))
    },
    addNewCard (state, payload) {
      state.cards.push(payload)
    },
    updateExistingCard (state, payload) {
      const elIndex = state.cards.findIndex((el: CardInterface) => el._id === payload.oldID)
      if (payload.futureIndex !== null) {
        state.cards.splice(elIndex, 1)
        state.cards.splice(payload.futureIndex, 0, payload.card)
      } else {
        state.cards.splice(elIndex, 1, payload.card)
      }
    },
    removeCard (state, payload) {
      const index = state.cards.findIndex((el: CardInterface) => el._id === payload)
      state.cards.splice(index, 1)
    },
    showError (state, payload) {
      state.alert = payload
    },
    createColumn (state, payload) {
      state.columns.push(payload.title)
    },
    pushColumn (state, payload) {
      state.columns.splice(0, state.columns.length, ...payload)
    }
  },
  actions: {
    async fetchAllCards (context) {
      const remoteCards = await getCards('heroku', context)
      context.commit('clear')
      context.commit('saveCardsFromLocalStorage', remoteCards)
      const columns = localStorage.getItem('columns') ? JSON.parse(localStorage.getItem('columns')!) : null
      if (columns) {
        context.commit('pushColumn', columns)
      }
    },
    async addNewCard (context, payload) {
      const newCard = await saveCards('heroku_create', context.state.cards, payload, context)
      context.commit('addNewCard', newCard)
    },
    async updateExistingCard (context, payload) {
      const updatedCard = await saveCards('heroku_update', context.state.cards, payload, context)
      context.commit('updateExistingCard', { card: updatedCard, oldID: payload.card.id, futureIndex: payload.futureIndex })
    },
    removeCard (context, payload) {
      context.commit('removeCard', payload)
      apiService.removeCard(payload)
    },
    createColumn (context, payload) {
      context.commit('createColumn', payload)
      localStorage.setItem('columns', JSON.stringify(context.state.columns))
    }
  },
  modules: {
  }
})
