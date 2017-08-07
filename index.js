'use strict'

const alfy = require('alfy')
const searchIndex = require('./search-index.json')

const BASE_URL = 'https://hexdocs.pm/elixir'

const items = alfy
  .inputMatches(searchIndex, 'descriptor')
  .map(item => {
    let title = item.module
    let url = `${BASE_URL}/${item.module}.html`

    if (item.id) {
      title += `.${item.id}`
      url += `#${item.id}`
    }

    return { title, arg: url }
  })

alfy.output(items)
