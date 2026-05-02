const DEFAULT_PRODUCTION_ORIGIN = "https://durian-studio-site.vercel.app";

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function getBrowserOrigin(): string | null {
  if (typeof window === "undefined") return null;
  return window.location.origin;
}

export function getRequestOrigin(request: Request): string {
  const url = new URL(request.url);
  const host = request.headers.get("host") ?? request.headers.get("x-forwarded-host");

  if (host) {
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const protocol = forwardedProto ?? url.protocol.replace(/:$/, "");
    return `${protocol}://${host}`;
  }

  return url.origin;
}

export function getServerFallbackOrigin(): string {
  const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (explicitSiteUrl) return trimTrailingSlash(explicitSiteUrl);

  if (process.env.VERCEL_URL) {
    return `https://${trimTrailingSlash(process.env.VERCEL_URL)}`;
  }

  return DEFAULT_PRODUCTION_ORIGIN;
}

export function getAuthCallbackUrl(origin?: string | null): string {
  const resolvedOrigin = origin ?? getBrowserOrigin() ?? getServerFallbackOrigin();
  return `${trimTrailingSlash(resolvedOrigin)}/auth/callback`;
}
