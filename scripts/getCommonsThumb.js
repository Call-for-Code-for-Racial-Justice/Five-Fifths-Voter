#!/usr/bin/env node
// Usage: node commons-thumb.js <file name> [width]

const [fileArg, widthArg = '120'] = process.argv.slice(2);
const name = fileArg.replace(/^(File|Image):/i, '');

async function commonsThumb(fileName, width = 120) {
  const params = new URLSearchParams({
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    iiurlwidth: width,
    format: 'json',
    origin: '*',
  });
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  return page.imageinfo?.[0]?.thumburl ?? null;
}
commonsThumb(name).then((u) => console.log(u))
