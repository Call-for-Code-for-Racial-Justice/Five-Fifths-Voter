import createClient from "nano";
import { IamAuthenticator } from "ibm-cloud-sdk-core";
import { useWinstonLogger } from "~/utils/logging";

const logger = useWinstonLogger("cloudant");

const CLOUDANT_URL =
  process.env.CLOUDANT_URL || "http://admin:ThisIsGibberish@0.0.0.0:6143";
const CLOUDANT_DB = process.env.CLOUDANT_DB || "local_55voter";
const CLOUDANT_APIKEY = process.env.CLOUDANT_APIKEY;
// Leave headers empty for now. This is used by nano and IamAuthenticator
const config = {
  url: CLOUDANT_URL,
  requestDefaults: {
    headers: {},
  },
};

let nano;
let cloudantAuthenticate;
function initClient() {
  if (nano) return nano;
  logger.info(`using cloundant url: ${CLOUDANT_URL}`);
  logger.info(`using cloundant db: ${CLOUDANT_DB}`);
  logger.info(`authenticating with api key: ${Boolean(CLOUDANT_APIKEY)}`);

  const authenticator = new IamAuthenticator({
    apikey: CLOUDANT_APIKEY || "none",
  });
  nano = createClient(config);
  cloudantAuthenticate = async () => {
    if (CLOUDANT_APIKEY)
      await authenticator.authenticate(config.requestDefaults);
  };
  return nano;
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Retry a cloudant function if a "429 Too Many Requests" is encountered
 * @param {function} fn
 * @param ignoreConflict
 * @return {Promise<object>}
 */
export async function retryHelper(fn, ignoreConflict = true) {
  let retry = 20;
  let body;
  for (let i = 0; i < retry; i++) {
    await cloudantAuthenticate();
    body = await fn().catch(async (reason) => {
      if (reason.statusCode === 429) {
        const sleep = getRandomArbitrary(250, 1250);
        logger.info(
          `cloudant: sleeping ${sleep.toFixed(1)} ms due to rate limit (remaining retries ${retry})`,
        );
        // eslint-disable-next-line no-undef
        await new Promise((resolve) => setTimeout(resolve, sleep));
      } else if (ignoreConflict && reason.statusCode === 409) {
        return {};
      } else {
        throw reason;
      }
    });
    if (body) break;
  }
  return body;
}

/**
 * Candidate document
 * @typedef {Object} CandidateData
 * @property {string} _id
 * @property {string} name
 * @property {Array<string>} states
 * @property {string} party
 * @property {string} candidate - i.e. us-president, senate, etc
 * @property {Object} social links to social sites
 */

/**
 * Get candidates for elections
 * @param {string} date i.e. 2024-11-05
 * @param {string} state i.e. "ga"
 * @return {Promise<[CandidateData]>}
 */
export async function getCandidates(date, state) {
  initClient();
  await cloudantAuthenticate();
  const data = nano.db.use(CLOUDANT_DB);
  const body = await retryHelper(() =>
    data.partitionedView(date, "candidates", "byState", {
      include_docs: true,
      keys: ["all", state],
    }),
  );
  logger.info(`got ${body.rows.length} items from ${date}`);

  return body.rows.map((row) => row.doc);
}
