import jwt from "jsonwebtoken";
import { useWinstonLogger } from "~/server/utils/logging";

export function getAuthCookie(event) {
  const secret = process.env.JWT_SECRET || "__LOCAL_ONLY__";
  const logger = useWinstonLogger("auth");
  if (secret === "__LOCAL_ONLY__") logger.warn("JWT_SECRET not defined");
  const cookie = getCookie(event, "ff-auth");
  try {
    return jwt.verify(cookie, secret);
  } catch (ex) {
    logger.warn(ex.message);
    return {};
  }
}

export function setAuthCookie(event, payload) {
  const secret = process.env.JWT_SECRET || "__LOCAL_ONLY__";
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  setCookie(event, "ff-auth", token, {
    httpOnly: true,
    maxAge: 604800, // 1d
    sameSite: "lax",
  });
}

export function deleteAuthCookie(event) {
  deleteCookie(event, "ff-auth");
}
