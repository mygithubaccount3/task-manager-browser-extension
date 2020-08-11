import NetworkService from '../network.service'

export default class CardsApi {
  async fetchAllCards () {
    return await (new NetworkService('https://api.magicthegathering.io/v1')).get('/cards')
  }

  async fetchUserCards () {
    return await (new NetworkService('https://raysael.herokuapp.com')).get('/todo', { params: { author: 'null@null.null' } })
  }

  async createCard (title: string, description: string) {
    return await (new NetworkService('https://raysael.herokuapp.com')).post('/todo', { data: { author: 'null@null.null', title, description } })
  }

  async removeCard (id: string) {
    return await (new NetworkService('https://raysael.herokuapp.com')).delete(`/todo/${id}`)
  }
}
