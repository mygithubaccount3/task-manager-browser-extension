import { use } from 'typescript-mix'
import NetworkService from './network.service'
import CardsApi from './api/cards'

interface ApiService extends NetworkService, CardsApi {}

class ApiService {
    @use(CardsApi) this!: ApiService
}

const apiService = new ApiService()

export default apiService
