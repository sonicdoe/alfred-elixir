'use strict'

const fs = require('fs')
const got = require('got')

const BASE_URL = 'https://hexdocs.pm/elixir'

got(`${BASE_URL}/Kernel.html`).then(response => {
  const filename = response.body.match(/sidebar_items-([0-9a-f]{10})\.js/)[0]
  const url = `${BASE_URL}/dist/${filename}`

  return got(url)
}).then(response => {
  return response.body.slice('sidebarNodes='.length)
}).then(data => {
  return JSON.parse(data)
}).then(nodes => {
  return [
    ...nodes.modules,
    ...nodes.exceptions,
    ...nodes.protocols,
    ...nodes.tasks
  ].reduce((accumulator, module) => {
    return accumulator.concat({
      module: module.id,
      descriptor: module.id
    }).concat([
      ...(module.functions || []),
      ...(module.macros || []),
      ...(module.callbacks || []),
      ...(module.types || [])
    ].reduce((accumulator, element) => {
      return accumulator.concat({
        module: module.title,
        id: element.id,
        descriptor: `${module.id}.${element.id}`
      })
    }, []))
  }, [])
}).then(index => {
  fs.writeFileSync('search-index.json', JSON.stringify(index))
})
