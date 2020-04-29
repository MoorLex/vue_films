const Home = () => import('../pages/Home')
const Film = () => import('../pages/Film')
const Search = () => import('../pages/Search')
const NotFound = () => import('../pages/NotFound')

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/:id',
    name: 'Film',
    props: route => ({
      id: route.params.id
    }),
    component: Film
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]
