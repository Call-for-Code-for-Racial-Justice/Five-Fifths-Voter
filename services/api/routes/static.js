const express = require("express")
const router = express.Router()

// UI code
router.use(
  "/",
  express.static("dist", {
    maxAge: "30 days",
    setHeaders: (res, path) => {
      if (express.static.mime.lookup(path) === "text/html") {
        // Skip cache on html to load new builds.
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
      }
    },
  })
)

module.exports = router
