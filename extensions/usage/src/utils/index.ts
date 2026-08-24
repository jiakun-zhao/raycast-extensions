import { getPreferenceValues } from '@raycast/api'

interface OcgBucket {
  status: string
  percent: number
  resetsAt: string
}

export interface OcgUsage {
  usage: {
    rolling: OcgBucket
    weekly: OcgBucket
    monthly: OcgBucket
  }
}

export interface DeepSeekBalanceInfo {
  currency: string
  total_balance: string
  granted_balance: string
  topped_up_balance: string
}

export interface DeepSeekBalance {
  is_available: boolean
  balance_infos: DeepSeekBalanceInfo[]
}

export interface ApimartBalance {
  success: boolean
  remain_balance: number
  remain_credits: number
  used_balance: number
  used_credits: number
}

interface Preferences {
  ocgApiKey: string
  dsApiKey: string
  apimartApiKey: string
}

const providers = {
  'opencode-go': {
    title: 'OpenCode Go',
    baseUrl: 'https://opencode.ai/zen/go/v1',
    apiKey: 'ocgApiKey',
    path: '/usage',
  },
  deepseek: {
    title: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com',
    apiKey: 'dsApiKey',
    path: '/user/balance',
  },
  apimart: {
    title: 'APIMart',
    baseUrl: 'https://api.apib.ai',
    apiKey: 'apimartApiKey',
    path: '/v1/user/balance',
  },
} as const

export type ProviderKey = keyof typeof providers
type Result<T extends ProviderKey> = T extends 'opencode-go'
  ? OcgUsage
  : T extends 'deepseek'
    ? DeepSeekBalance
    : ApimartBalance

async function requestJson<T>(baseUrl: string, apiKey: string, path: string): Promise<T> {
  const res = await fetch(`${baseUrl.replace(/\/+$/, '')}${path}`, {
    headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

export async function getUsage<T extends ProviderKey>(key: T): Promise<Result<T>> {
  const config = providers[key]
  const prefs = getPreferenceValues<Preferences>()
  const apiKey = prefs[config.apiKey]
  const data = await requestJson<OcgUsage | DeepSeekBalance | ApimartBalance>(
    config.baseUrl,
    apiKey,
    config.path,
  )
  return data as Result<T>
}
