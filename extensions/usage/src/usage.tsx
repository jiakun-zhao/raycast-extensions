import { Action, ActionPanel, Color, Icon, List } from '@raycast/api'
import { usePromise } from '@raycast/utils'
import type { ReactNode } from 'react'
import { getUsage } from './utils'
import type { ApimartBalance, DeepSeekBalance, OcgUsage } from './utils'

const OCG_BUCKETS = [
  { key: 'rolling', title: 'Rolling (5h)' },
  { key: 'weekly', title: 'Weekly' },
  { key: 'monthly', title: 'Monthly' },
] as const

function tintColor(percent: number) {
  if (percent >= 80) {
    return Color.Red
  }
  if (percent >= 50) {
    return Color.Orange
  }
  return Color.Green
}

function refreshActions(revalidate: () => void) {
  return (
    <ActionPanel>
      <Action title='Refresh' icon={Icon.ArrowClockwise} onAction={revalidate} />
    </ActionPanel>
  )
}

function OcgItems({ data, revalidate }: { data: OcgUsage; revalidate: () => void }) {
  return OCG_BUCKETS.map(({ key, title }) => {
    const bucket = data.usage[key]
    return (
      <List.Item
        key={key}
        icon={{ source: Icon.Gauge, tintColor: tintColor(bucket.percent) }}
        title={title}
        subtitle={`${bucket.percent}% used`}
        accessories={[{ text: `resets ${new Date(bucket.resetsAt).toLocaleString()}` }]}
        actions={refreshActions(revalidate)}
      />
    )
  })
}

function DeepSeekItems({ data, revalidate }: { data: DeepSeekBalance; revalidate: () => void }) {
  return data.balance_infos.map((info) => (
    <List.Item
      key={info.currency}
      icon={{ source: Icon.Coin, tintColor: data.is_available ? Color.Green : Color.Red }}
      title={`${info.total_balance} ${info.currency}`}
      subtitle={`granted ${info.granted_balance} · topped up ${info.topped_up_balance}`}
      accessories={[{ text: data.is_available ? 'Available' : 'Unavailable' }]}
      actions={refreshActions(revalidate)}
    />
  ))
}

function ApimartItems({ data, revalidate }: { data: ApimartBalance; revalidate: () => void }) {
  return (
    <List.Item
      icon={{ source: Icon.Coin, tintColor: data.success ? Color.Green : Color.Red }}
      title={`Remaining: ${data.remain_balance} · ${data.remain_credits} credits`}
      subtitle={`Used: ${data.used_balance} · ${data.used_credits} credits`}
      accessories={[{ text: data.success ? 'OK' : 'Failed' }]}
      actions={refreshActions(revalidate)}
    />
  )
}

function ProviderSection<T>({
  title,
  error,
  data,
  revalidate,
  render,
}: {
  title: string
  error?: Error
  data?: T
  revalidate: () => void
  render: (data: T) => ReactNode
}) {
  let content: ReactNode
  if (error) {
    content = (
      <List.Item
        icon={Icon.Warning}
        title={title}
        subtitle={error.message}
        actions={refreshActions(revalidate)}
      />
    )
  } else if (data) {
    content = render(data)
  } else {
    content = null
  }
  return <List.Section title={title}>{content}</List.Section>
}

export default function Command() {
  const ocg = usePromise(() => getUsage('opencode-go'))
  const ds = usePromise(() => getUsage('deepseek'))
  const apimart = usePromise(() => getUsage('apimart'))

  return (
    <List isLoading={ocg.isLoading || ds.isLoading || apimart.isLoading}>
      <ProviderSection
        title='OpenCode Go'
        error={ocg.error}
        data={ocg.data}
        revalidate={ocg.revalidate}
        render={(data) => <OcgItems data={data} revalidate={ocg.revalidate} />}
      />
      <ProviderSection
        title='DeepSeek'
        error={ds.error}
        data={ds.data}
        revalidate={ds.revalidate}
        render={(data) => <DeepSeekItems data={data} revalidate={ds.revalidate} />}
      />
      <ProviderSection
        title='APIMart'
        error={apimart.error}
        data={apimart.data}
        revalidate={apimart.revalidate}
        render={(data) => <ApimartItems data={data} revalidate={apimart.revalidate} />}
      />
    </List>
  )
}
