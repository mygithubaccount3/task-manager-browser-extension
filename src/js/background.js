import apiService from '../services/api.service'

browser.runtime.onMessage.addListener(async (request) => {
  if (request.action === 'create') {
    return await apiService.createCard(request.title, request.description)
      .then(res => {
        return Promise.resolve({ newCard: res, spinner: false })
      }, error => {
        return Promise.reject(new Error(error))
      })
      .catch(error => {
        return Promise.reject(new Error(error))
      })
  } else if (request.action === 'update') {
    return await apiService.updateCard(request.id, request.title, request.text)
      .then(res => {
        return Promise.resolve({ updatedCard: res, spinner: false })
      }, error => {
        return Promise.reject(new Error(error))
      })
      .catch(error => {
        return Promise.reject(new Error(error))
      })
  } else if (request.action === 'fetch') {
    return await apiService.fetchUserCards()
      .then(res => {
        return Promise.resolve({ cards: res })
      }, error => {
        return Promise.reject(new Error(error))
      })
      .catch(error => {
        return Promise.reject(new Error(error))
      })
  }
})
