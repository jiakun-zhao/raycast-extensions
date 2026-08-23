import { Color, Icon, List } from '@raycast/api'
import { usePromise } from '@raycast/utils'
import { get } from './utils'
import { ListError, RepoActionPanel } from './utils/components'

export default function Command() {
  const { isLoading, data, error } = usePromise(() => get('repos'))

  return (
    <List isLoading={isLoading}>
      {error ? (
        <ListError />
      ) : (
        data?.map((repo) => (
          <List.Item
            icon={repo.private ? Icon.Lock : { source: Icon.LockUnlocked, tintColor: Color.Green }}
            key={repo.full_name}
            title={repo.name}
            subtitle={{ value: repo.description }}
            accessories={[{ icon: Icon.Star, text: repo.stargazers_count.toString() }]}
            actions={RepoActionPanel(repo)}
          />
        ))
      )}
    </List>
  )
}
