const debug = require("debug")("twitter")
// const mock_twitter = require("../../data/mock/mock_twitter")

// var isDevelopment = process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined

// // Warn about not getting Twitter results
// const useTwitterMock =
//   isDevelopment &&
//   (!process.env.NODE_TWITTER_API_KEY ||
//     !process.env.NODE_TWITTER_API_SECRET_KEY ||
//     !process.env.NODE_TWITTER_ACCESS_TOKEN ||
//     !process.env.NODE_TWITTER_ACCESS_TOKEN_SECRET ||
//     !process.env.NODE_TA_API_KEY ||
//     !process.env.NODE_TA_API_URL ||
//     !process.env.NODE_NLU_API_KEY ||
//     !process.env.NODE_NLU_API_URL)

// if (useTwitterMock) {
//   debug("Twitter Access not configured")
//   debug("All Twitter requests from the social page will return mock data from @BarackObama")
//   debug("If you are working locally read the services/README.md file")
//   debug(
//     "If you need live Twitter data, you need to create twitter and IBM cloud access keys but both are free"
//   )
// }

exports.get_tweets = (req, res) => {
  let screenname = req.query.screenname
  res.status(401).send({ message: "not implemented" })

  // if (useTwitterMock) {
  //   res.send({ ...mock_twitter, screen_name: screenname })
  // } else {
  //   const { spawn } = require("child_process")
  //   const chatter = spawn("python3", ["twitter/Chatter.py", screenname])

  //   const chunks = []

  //   chatter.stdout.on("data", function (chunk) {
  //     chunks.push(chunk)
  //   })

  //   chatter.on("close", (code) => {
  //     console.log(`child process exited with code ${code}`)
  //     try {
  //       if (code !== 0) {
  //         res.status(404).send()
  //       } else {
  //         const resp_data = Buffer.concat(chunks)
  //         const jdata = JSON.parse(resp_data)
  //         res.send(jdata)
  //       }
  //     } catch (error) {
  //       res.status(500).send()
  //     }
  //   })
  // }
}
