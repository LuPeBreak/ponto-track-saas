'use server'

import { env } from '@ponto-track-saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGithubAction() {
  const githubSignInUrl = new URL('login/oauth/authorize', 'https://github.com')

  githubSignInUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubSignInUrl.searchParams.set(
    'redirect_uri',
    env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
  )
  githubSignInUrl.searchParams.set('scope', 'user')

  redirect(githubSignInUrl.toString())
}
