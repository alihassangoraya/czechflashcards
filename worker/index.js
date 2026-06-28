export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const pathname = new URL(request.url).pathname;

    if (pathname !== "/" && pathname !== "/index.html" && pathname !== "/sw.js") {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-cache");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
