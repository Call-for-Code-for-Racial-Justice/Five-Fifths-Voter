export default function () {
  const appURL = process.env.CE || "http://localhost:4007";
  return appURL + "/auth/callback";
}
