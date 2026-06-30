import { isAppRoute } from "./appRoutes.js";

export function createAssetRequest(request) {
  const pathname = new URL(request.url).pathname;
  const appRoute = isAppRoute(pathname, request.method);
  const assetRequest = appRoute ? new Request(new URL("/index.html", request.url), request) : request;

  return { appRoute, assetRequest, pathname };
}

export function shouldDisableCache(appRoute, pathname) {
  return appRoute || pathname === "/sw.js";
}
