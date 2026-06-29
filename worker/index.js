export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    const appRoute = pathname === "/" || pathname === "/index.html" || pathname === "/quiz" || pathname === "/flashcards";
    const assetRequest = appRoute ? new Request(new URL("/index.html", request.url), request) : request;
    const response = await env.ASSETS.fetch(assetRequest);

    if (!appRoute && pathname !== "/sw.js") {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-cache");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
