import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import server from './backend/mock-server'
import { resetTodos } from './backend/helpers'
import App from './frontend/components/App'

jest.setTimeout(750)
const waitForOptions = { timeout: 100 }
const queryOptions = { exact: false }

const renderApp = ui => {
  window.localStorage.clear()
  window.history.pushState({}, 'Test page', '/')
  return render(ui)
}

beforeAll(() => { server.listen() })
afterAll(() => { server.close() })
beforeEach(() => {
  resetTodos()
  renderApp(<App />)
})
afterEach(() => {
  server.resetHandlers()
})

test('[1] heading is present', async () => {
  expect(screen.queryByText('React Todos')).toBeInTheDocument()
})

test('[2] todos are present', async () => {
  expect(await screen.findByText(/laundry/, queryOptions, waitForOptions)).toBeInTheDocument()
  expect(await screen.findByText(/dishes/, queryOptions, waitForOptions)).toBeInTheDocument()
  expect(await screen.findByText(/groceries/, queryOptions, waitForOptions)).toBeInTheDocument()
})

test('[3] can do laundry', async () => {
  expect(await screen.findByText('laundry pending', queryOptions, waitForOptions)).toBeInTheDocument()
  fireEvent.click(screen.getAllByText('complete')[0])
  expect(await screen.findByText('laundry DONE', queryOptions, waitForOptions)).toBeInTheDocument()
})
