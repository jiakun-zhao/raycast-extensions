import type { RestEndpointMethodTypes } from '@octokit/rest'
import { Action, ActionPanel, List } from '@raycast/api'

export function ListError() {
  return (
    <List.EmptyView
      icon='😢'
      title='Something went wrong...'
      description='Check the network or try again later...'
    />
  )
}

type Repo = RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][0]

export function RepoActionPanel(repo: Repo) {
  return (
    <ActionPanel>
      <Action.OpenInBrowser url={repo.html_url} />
      <Action.CopyToClipboard title='Copy url' content={repo.html_url} />
    </ActionPanel>
  )
}
