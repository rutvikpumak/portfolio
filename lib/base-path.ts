/** GitHub Pages project sites are served under /<repo>. Empty for local `next dev`. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.PAGES_BASE_PATH || "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
