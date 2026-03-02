import type { RoutePath } from "../types/email";

export const validPaths: RoutePath[] = [
  "/",
  "/instructions/defaulter",
  "/instructions/customize",
  "/workflow/defaulter",
  "/workflow/customize",
  "/success",
];

export const excelAccept = ".xlsx,.xlsm,.xlsb,.xltx,.xltm,.xls,.xlt,.xml";

export function routeTitle(path: RoutePath): string {
  if (path === "/") return "Dashboard";
  if (path === "/instructions/defaulter") return "Defaulter Instructions";
  if (path === "/instructions/customize") return "Customize Instructions";
  if (path === "/workflow/defaulter") return "Defaulter Workflow";
  if (path === "/workflow/customize") return "Customize Workflow";
  return "Success";
}
