import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ssddelhi.org';
  const routes = [
    '',
    '/about',
    '/history',
    '/rank-structure',
    '/join',
    '/events',
    '/news',
    '/articles',
    '/blog',
    '/gallery',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'yearly' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
