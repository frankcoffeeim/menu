export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'GET') {
    const data = await env.MENU_STORE.get('menu');
    return new Response(data || '[]', {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (request.method === 'POST') {
    const body = await request.json();
    await env.MENU_STORE.put('menu', JSON.stringify(body));
    return new Response('{"status":"ok"}', {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
