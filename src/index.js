import { join } from 'lodash-es'
import './style.css'
import './style'
import { cube } from './math.js'

let context

function component () {
  const element = document.createElement('div')
  const btn = document.createElement('button')
  const br = document.createElement('br')

  btn.innerHTML = 'Click me and check the console!!!'
  element.innerHTML = join([
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ], '\n\n')
  element.appendChild(br)
  element.appendChild(btn)
  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  // btn.onclick = e => import(/* webpackChunkName: "print" */ './print.js').then(module => {
  //   const print = module.default
  //   print()
  // }
  context = require.context('.', true, /^\.\/.*$/, 'lazy')
  btn.onclick = e => context('./print').then(module => {
    const print = module.default
    print()
  })
  return element
}

var element = component()
document.body.appendChild(element)
// document.body.appendChild(component())

if (module.hot) {
  module.hot.accept(['./math.js'], () => {
    console.log('hi others!')
    document.body.removeChild(element)
    element = component() // Re-render the "component" to update the click handler
    document.body.appendChild(element)
  })
  module.hot.accept(context.id, () => {
    console.log(context.id)
    console.log('hi print.js!')
    document.body.removeChild(element)
    element = component() // Re-render the "component" to update the click handler
    document.body.appendChild(element)
  })
}
