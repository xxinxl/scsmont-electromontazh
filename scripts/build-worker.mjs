import { copyFile, mkdir, writeFile } from 'node:fs/promises';

const workerSource = `const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!env.ASSETS) {
      return new Response('Static assets binding is unavailable', { status: 500 });
    }

    let response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get('accept')?.includes('text/html');

    if (response.status === 404 && acceptsHtml) {
      const fallbackUrl = new URL('/index.html', url.origin);
      response = await env.ASSETS.fetch(new Request(fallbackUrl, request));
    }

    return response;
  },
};

export default worker;
`;

await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await writeFile('dist/server/index.js', workerSource, 'utf8');
await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json');
