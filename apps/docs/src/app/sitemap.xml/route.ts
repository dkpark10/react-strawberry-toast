import fs from 'fs';
import path from 'path';
import { SITE_URL } from '@/constants/site';

function getDocsRoutes(dir: string, basePath = '/docs'): string[] {
  const routes: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const pagePath = path.join(fullPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        routes.push(`${basePath}/${item}`);
      }
      routes.push(...getDocsRoutes(fullPath, `${basePath}/${item}`));
    }
  }

  return routes;
}

function getRoutes(): string[] {
  const docsDir = path.join(process.cwd(), 'src/app/docs');
  const docsRoutes = fs.existsSync(docsDir) ? getDocsRoutes(docsDir) : [];

  return ['', '/docs', ...docsRoutes];
}

const routes = getRoutes();

export async function GET() {
  const lastModified = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
      .map(
        (route) => `  <url>
        <loc>${SITE_URL}${route}</loc>
        <lastmod>${lastModified}</lastmod>
        <changefreq>${route === '' ? 'weekly' : 'monthly'}</changefreq>
        <priority>${route === '' ? '1.0' : route === '/docs' ? '0.9' : '0.8'}</priority>
      </url>`,
      )
      .join('\n')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
