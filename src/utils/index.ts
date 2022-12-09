import path from 'path-browserify'

export function isExternalLink(path: string): boolean {
  return /^(http?:|https?:|mailto:|tel:)/.test(path)
}

export function resolvePath(basePath: string, routePath: string): string {
  if (isExternalLink(routePath)) {
    return routePath
  }
  if (isExternalLink(basePath)) {
    return basePath
  }
  return path.resolve(basePath, routePath)
}

export function resolveBasePath(path: string): string {
  return resolvePath('/', path)
}
