import { Octokit } from '@octokit/rest'
import { getPreferenceValues, LocalStorage } from '@raycast/api'
import { followed, repos, stars } from './functions'

const functions = { followed, repos, stars }
type Functions = typeof functions
type Value<T extends Key> = Promise<Awaited<ReturnType<Functions[T]>>>
export type Key = keyof Functions

async function fetchFromGitHub(key: Key) {
  const { auth } = getPreferenceValues<{ auth: string }>()
  const octokit = new Octokit({ auth, request: { fetch } })
  return await functions[key](octokit)
}

export async function get<T extends Key>(key: T): Value<T> {
  const value = await LocalStorage.getItem<string>(`github-${key}`)
  return value ? JSON.parse(value) : ([] as never)
}

export async function set(key: Key) {
  const value = await fetchFromGitHub(key)
  await LocalStorage.setItem(`github-${key}`, JSON.stringify(value))
}
