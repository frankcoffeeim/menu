export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

  if (url.pathname === "/load-menu") {
  const raw = await env.MENU.get("data");
  const valid = raw && raw.trim().startsWith("[") ? raw : "[]";
  return new Response(valid, {
    headers: { "Content-Type": "application/json" }
  });
}

    if (url.pathname === "/save-menu" && request.method === "POST") {
      const body = await request.text();
      await env.MENU.put("data", body);
      return new Response("Saved", { status: 200 });
    }

    return env.ASSETS.fetch(request);
  }
}
