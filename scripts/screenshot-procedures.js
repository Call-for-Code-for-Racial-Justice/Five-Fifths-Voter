#!/usr/bin/env node

// Script to parse YAML files under app/content/procedures, visit each URL, and take screenshots.
// Requirements:
// - Uses headless Chromium via Puppeteer
// - Output directory structure: screenshots/{State}/{section}/{key}.png
// - Skips values that are not valid URLs (null, "???", non-http(s))
// - Retries navigation briefly; logs failures

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const puppeteer = require('puppeteer');

const PROCEDURES_DIR = path.resolve(__dirname, '..', 'app', 'content', 'procedures');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'screenshots');

function isProbablyUrl(value) {
  if (!value || typeof value !== 'string') return false;
  if (value.trim() === '' || value.includes('???')) return false;
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function sanitize(segment) {
  return String(segment)
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function collectLinksFromProcedure(obj) {
  // Traverse known link fields according to app/types/procedure.ts
  const out = [];
  const stateName = obj.region || obj.region_code || 'Unknown';

  if (obj.early_voting && obj.early_voting.more_link && isProbablyUrl(obj.early_voting.more_link)) {
    out.push({ stateName, section: 'early_voting', key: 'more_link', url: obj.early_voting.more_link });
  }

  if (obj.register) {
    const keys = ['felon_link','mail_link','online_link','change_party_link','check_link','more_link','youth_link'];
    for (const k of keys) {
      const v = obj.register[k];
      if (isProbablyUrl(v)) out.push({ stateName, section: 'register', key: k, url: v });
    }
  }

  if (obj.mail_in) {
    const keys = ['dropoff_link','id_link','request_link','track_link','more_link'];
    for (const k of keys) {
      const v = obj.mail_in[k];
      if (isProbablyUrl(v)) out.push({ stateName, section: 'mail_in', key: k, url: v });
    }
  }

  return out;
}

async function screenshotPage(page, url, outPath) {
  const timeoutMs = 45000;
  const waitUntil = 'networkidle2';
  const fn = path.relative(process.cwd(), outPath)
  try {
      await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0')
    await page.goto(url, { waitUntil, timeout: timeoutMs });
      // Inject CSS to style the URL display
      await page.addStyleTag({
          content: `
            #puppeteer-url-display {
                position: fixed;
                bottom: 10px;
                right: 10px;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 5px 10px;
                font-family: sans-serif;
                font-size: 14px;
                z-index: 99999;
                white-space: pre-line;
            }
        `
      });

      // Inject the URL into the page
      await page.evaluate((url, fn) => {
          const urlDisplay = document.createElement('div');
          urlDisplay.id = 'puppeteer-url-display';
          urlDisplay.textContent = url + "\n" + fn;
          document.body.appendChild(urlDisplay);
      }, url, fn);
  } catch (e) {
      console.error('Failed to navigate to', url, 'with waitUntil', waitUntil, ':', e.message);
    // retry once with a different waitUntil
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
    } catch (e2) {
      throw e2;
    }
  }
  // await page.waitForTimeout(1500);
  ensureDir(path.dirname(outPath));
  console.log(`Capturing ${url} -> ${fn}`);
  await page.screenshot({ path: outPath, fullPage: false });
}

async function main() {
  const onlyState = process.argv.find(a => a.startsWith('--state='))?.split('=')[1] || null;

  const files = fs.readdirSync(PROCEDURES_DIR)
    .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'))
    .filter(f => !onlyState || f.toLowerCase().startsWith(onlyState.toLowerCase().replace(/\s+/g, '')));

  if (files.length === 0) {
    console.error('No YAML files found under', PROCEDURES_DIR, 'matching state filter:', onlyState || 'none');
    process.exit(1);
  }

  const allLinks = [];

  for (const file of files) {
    const full = path.join(PROCEDURES_DIR, file);
    try {
      const text = fs.readFileSync(full, 'utf8');
      const data = yaml.load(text);
      const links = collectLinksFromProcedure(data);
      allLinks.push({ file, state: data.region || file.replace(/\.ya?ml$/i,''), links });
    } catch (err) {
      console.warn('Failed to parse', file, err.message);
    }
  }

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });

  for (const item of allLinks) {
    const stateDir = path.join(OUTPUT_DIR, sanitize(item.state));
    for (const link of item.links) {
      const outPath = path.join(stateDir, `${sanitize(link.section + '___' + link.key)}.png`);
      try {
        await screenshotPage(page, link.url, outPath);
      } catch (e) {
        console.error('Failed to capture', link.url, 'from', item.file, '-', e.message);
      }
    }
  }

  await browser.close();
  console.log('Done. Screenshots saved to', OUTPUT_DIR);
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
