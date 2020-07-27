import _ from 'lodash'
import './style.css'

function component() {
  const element = document.createElement('div')
  const btn = document.createElement('button')
  const br = document.createElement('br')

  btn.innerHTML = 'Click me and check the console!!!'
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.appendChild(br)
  element.appendChild(btn)
  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    const print = module.default
    print()
  })
  return element
} 

document.body.appendChild(component())
