import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.respeito.org.br',
      lastModified: '2026-09-03',
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
