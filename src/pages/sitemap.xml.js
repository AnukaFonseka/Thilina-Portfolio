const SITE_URL = 'https://anuka-fonseka.vercel.app';

function generateSiteMap(slugs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url><loc>${SITE_URL}</loc><priority>1.0</priority></url>
     <url><loc>${SITE_URL}/about</loc><priority>0.8</priority></url>
     <url><loc>${SITE_URL}/projects</loc><priority>0.8</priority></url>
     <url><loc>${SITE_URL}/articles</loc><priority>0.8</priority></url>
     ${slugs.map(slug => `<url><loc>${SITE_URL}/articles/${slug}</loc><priority>0.7</priority></url>`).join('')}
   </urlset>`;
}

export async function getServerSideProps({ res }) {
  const { articles } = await import('@/data/articlesData');
  const slugs = articles.map(a => a.slug);
  const sitemap = generateSiteMap(slugs);
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function SiteMap() {}