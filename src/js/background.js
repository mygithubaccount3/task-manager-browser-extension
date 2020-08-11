import networkService from '../services/network.service'
import apiService from '../services/api.service'

browser.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.fetch) {
      apiService.fetchAllCards()
        .then(res => {
          res.cards.forEach((el) => {
            if (el.imageUrl) {
              port.postMessage({ url: el.imageUrl })
            }
          })
          port.postMessage({ spinner: false })
          port.disconnect()
        })
        .catch(error => {
          port.postMessage({ error })
          port.disconnect()
        })
    } else if (msg.cancel) {
      networkService.source.cancel('Canceled')
    }
  })
})
