'use server'

import { redirect } from 'next/navigation'

export async function signInWithGithubAction() {
  const githubSignInUrl = new URL('login/oauth/authorize', 'https://github.com')

  githubSignInUrl.searchParams.set('client_id', 'Ov23lia2Y5iuz1qU6sk9')
  githubSignInUrl.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback',
  )
  githubSignInUrl.searchParams.set('scope', 'user')

  redirect(githubSignInUrl.toString())
}
