import { createAssetRequest, shouldDisableCache } from "./assetRequest.js";

export default {
  async fetch(request, env) {
    const { appRoute, assetRequest, pathname } = createAssetRequest(request);
    let response = await env.ASSETS.fetch(assetRequest);

    if (response.status === 404 && appRoute) {
      response = await env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
    }

    if (!shouldDisableCache(appRoute, pathname)) {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-cache");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
