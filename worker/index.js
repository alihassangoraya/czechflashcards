import { createAssetRequest, shouldDisableCache } from "./assetRequest.js";

export default {
  async fetch(request, env) {
    const { appRoute, assetRequest, pathname } = createAssetRequest(request);
    const response = await env.ASSETS.fetch(assetRequest);

    if (!shouldDisableCache(appRoute, pathname)) {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-cache");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
