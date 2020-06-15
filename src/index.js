import printMe from './print.js'
import './style.css'

async function getComponent() {
  const element = document.createElement('div')
  const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash')

  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  const btn = document.createElement('button')
  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = printMe
  element.appendChild(btn)
  return element
}

// Store the element to re-render on print.js changes
getComponent().then(component => {
  document.body.appendChild(component)
})

const element = getComponent()

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accept thee updated printMe module!')
    // document.body.removeChild(element) // Disconnects Dev Server
    // Re-render the "component" to update the click handler
    getComponent().then(component => {
      document.body.appendChild(component)
    })
  })
}
