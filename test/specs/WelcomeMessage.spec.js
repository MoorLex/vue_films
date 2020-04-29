import { render } from '@testing-library/vue'
import WelcomeMessage from '../../src/components/WelcomeMessage'

describe('WelcomeMessage.vue', () => {
  it('renders props.msg when passed', () => {
    const name = 'tester'

    const { findByText } = render(WelcomeMessage, {
      propsData: { name }
    })

    findByText('Hello tester from my Vue.js page, built with Webpack 4!')
  })
})
