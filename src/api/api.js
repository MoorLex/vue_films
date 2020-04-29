import axios from 'axios'
import { HttpMethodsEnum } from './index'
import Observer from './observer'

export default class Api {
  constructor () {
    this.observer = new Observer()
    this.baseUrl = process.env.API_URL || 'https://api.themoviedb.org/3'
    this.axios = axios.create({
      baseURL: this.baseUrl
    })
    this.axios.interceptors.request.use((config) => {
      config.requestStartTime = Date.now()
      return config
    })
    this.axios.interceptors.response.use((response) => {
      response.config.requestTime = Date.now() - response.config.requestStartTime
      return response
    })
  }

  async request (method, url, params = {}, headers = {}) {
    this.observer.broadcast('request', { method, url, params, headers })
    params.api_key = process.env.API_KEY
    const config = {
      method: (method === HttpMethodsEnum.PUT) ? HttpMethodsEnum.POST : method,
      headers: headers,
      url: url
    }
    if (method === HttpMethodsEnum.GET) {
      config.params = params
    } else if (method === HttpMethodsEnum.PUT) {
      config.data = { ...params, _method: 'put' }
    }
    return this.axios.request(config)
  }

  /**
   * @param {number} [page]
   */
  async getPopular (page) {
    const params = {
      page: page || 1
    }
    const { data } = await this.request(HttpMethodsEnum.GET, '/movie/popular', params)
    return data
  }

  async getUpcoming () {
    const { data } = await this.request(HttpMethodsEnum.GET, '/movie/upcoming')
    return data
  }

  /**
   * @param {string} [type]
   * @param {string} [time]
   */
  async getTrending (type = 'all', time = 'day') {
    const { data } = await this.request(HttpMethodsEnum.GET, `/trending/${type}/${time}`)
    return data
  }

  /**
   * @param {string|number} [id]
   */
  async getFilm (id) {
    const { data } = await this.request(HttpMethodsEnum.GET, `/movie/${id}`)
    return data
  }

  /**
   * @param {string|number} [id]
   */
  async getFilmCredits (id) {
    const { data } = await this.request(HttpMethodsEnum.GET, `/movie/${id}/credits`)
    return data
  }

  /**
   * @param {string|number} [id]
   */
  async getFilmReviews (id) {
    const { data } = await this.request(HttpMethodsEnum.GET, `/movie/${id}/reviews`)
    return data
  }

  /**
   * @param {string} [query]
   */
  async searchFilms (query) {
    const { data } = await this.request(HttpMethodsEnum.GET, '/search/movie', { query })
    return data
  }

  async getGenres () {
    const { data } = await this.request(HttpMethodsEnum.GET, '/genre/movie/list')
    return data
  }
}
