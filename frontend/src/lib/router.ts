import type { RoutePath } from "../types/email";
import { validPaths } from "../constants/routes";

export function isValidPath(pathname: string): pathname is RoutePath {
  return validPaths.includes(pathname as RoutePath);
}

export function currentPath(): RoutePath {
  const pathname = window.location.pathname;
  return isValidPath(pathname) ? pathname : "/";
}
