import test from 'ava'
import alfyTest from 'alfy-test'

test('finds Application', async t => {
  const alfy = alfyTest()
  const result = await alfy('application')

  t.deepEqual(result[0], {
    title: 'Application',
    arg: 'https://hexdocs.pm/elixir/Application.html'
  })
})

test('finds IO.puts/2', async t => {
  const alfy = alfyTest()
  const result = await alfy('puts')

  t.deepEqual(result[0], {
    title: 'IO.puts/2',
    arg: 'https://hexdocs.pm/elixir/IO.html#puts/2'
  })
})

test('finds Map.put/3', async t => {
  const alfy = alfyTest()
  const result = await alfy('Map.put')

  t.deepEqual(result[0], {
    title: 'Map.put/3',
    arg: 'https://hexdocs.pm/elixir/Map.html#put/3'
  })
})
