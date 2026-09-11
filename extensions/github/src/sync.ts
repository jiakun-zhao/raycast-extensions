import { environment, LaunchType, showToast, Toast, updateCommandMetadata } from '@raycast/api'
import type { Key } from './utils'
import { set } from './utils'

async function toast(options: Toast.Options) {
  if (environment.launchType === LaunchType.Background) {
    return
  }
  await showToast(options)
}

export default async function Command() {
  const tasks: Key[] = ['followed', 'repos', 'stars']

  await toast({ title: `Loading...`, style: Toast.Style.Animated })
    .then(() => Promise.all(tasks.map((name) => set(name))))
    .then(async () => {
      await toast({ title: 'Success.', style: Toast.Style.Success })
      await updateCommandMetadata({ subtitle: `Last update: ${new Date().toLocaleString()}` })
    })
    .catch(async () => {
      await toast({ title: 'Fail.', style: Toast.Style.Failure })
    })
}
