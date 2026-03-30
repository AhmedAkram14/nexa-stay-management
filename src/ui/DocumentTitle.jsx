import { useEffect } from "react";
import { useLocation } from "react-router";

import { APP_NAME } from "../config/appMeta";

function normalizePath(pathname) {
  const p = pathname.replace(/\/+$/, "") || "/";
  return p;
}

function titleForPath(pathname) {
  const path = normalizePath(pathname);

  if (path === "/login") return `${APP_NAME} - Login`;

  if (path.startsWith("/checkin/")) return `${APP_NAME} - Check in`;

  if (/^\/bookings\/[^/]+$/.test(path)) return `${APP_NAME} - Booking`;

  const exact = {
    "/dashboard": `${APP_NAME} - Dashboard`,
    "/bookings": `${APP_NAME} - Bookings`,
    "/cabins": `${APP_NAME} - Cabins`,
    "/users": `${APP_NAME} - Guests`,
    "/settings": `${APP_NAME} - Settings`,
    "/profile": `${APP_NAME} - Profile`,
    "/account": `${APP_NAME} - Update user`,
  };

  if (exact[path]) return exact[path];

  if (path !== "/" && path !== "/login") {
    return `${APP_NAME} - Page not found`;
  }

  return APP_NAME;
}

function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = titleForPath(pathname);
  }, [pathname]);

  return null;
}

export default DocumentTitle;
