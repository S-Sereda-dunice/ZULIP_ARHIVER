import { JSDOM } from 'jsdom';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getPage(url: string | URL) {
  const response = await fetch(url);
  const html = await response.text();
  const parser = new JSDOM(html);

  return parser.window.document;
}
