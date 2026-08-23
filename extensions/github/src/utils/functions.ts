import type { Octokit } from '@octokit/rest'

function toTime(str: string | null) {
  return new Date(str ?? '0000-00-00 00:00:00').getTime()
}

export async function followed(octokit: Octokit) {
  return await octokit.paginate(octokit.users.listFollowedByAuthenticatedUser)
}

export async function stars(octokit: Octokit) {
  return await octokit.paginate(octokit.activity.listReposStarredByAuthenticatedUser)
}

export async function repos(octokit: Octokit) {
  const res = await octokit.paginate(octokit.repos.listForAuthenticatedUser)
  return res.toSorted((a, b) => toTime(b.updated_at) - toTime(a.updated_at))
}
