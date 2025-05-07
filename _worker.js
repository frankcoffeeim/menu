
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    if (url.pathname === '/load-menu') {
      const data = await env.MENU.get('menu.json')
      return new Response(data || '[]', { headers: { 'Content-Type': 'application/json' } })
    }

    if (url.pathname === '/save-menu' && request.method === 'POST') {
      const body = await request.text()
      await env.MENU.put('menu.json', body)
      return new Response('Saved', { status: 200 })
    }

    return env.ASSETS.fetch(request)
  }
}
