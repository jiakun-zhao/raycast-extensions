import { Icon, Image, List } from '@raycast/api'
import { usePromise } from '@raycast/utils'
import { get } from './utils'
import { ListError, RepoActionPanel } from './utils/components'

export default function Command() {
  const { isLoading, data, error } = usePromise(() => get('stars'))

  return (
    <List isLoading={isLoading}>
      {error ? (
        <ListError />
      ) : (
        data?.map((repo) => (
          <List.Item
            icon={{ source: repo.owner.avatar_url, mask: Image.Mask.Circle }}
            key={repo.full_name}
            title={repo.full_name}
            subtitle={{ value: repo.description }}
            accessories={[{ icon: Icon.Star, text: repo.stargazers_count.toString() }]}
            actions={RepoActionPanel(repo)}
          />
        ))
      )}
    </List>
  )
}
