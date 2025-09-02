const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// Site configuration
const siteUrl = process.env.VITE_SITE_URL || 'https://akshatbansal.dev';
const buildDir = path.join(__dirname, '../dist');
const sitemapPath = path.join(buildDir, 'sitemap.xml');

// Pages to include in sitemap
const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/#about', changefreq: 'weekly', priority: 0.8 },
  { url: '/#projects', changefreq: 'weekly', priority: 0.8 },
  { url: '/#skills', changefreq: 'monthly', priority: 0.7 },
  { url: '/#achievements', changefreq: 'monthly', priority: 0.7 },
  { url: '/#contact', changefreq: 'monthly', priority: 0.7 },
];

// Create sitemap
async function generateSitemap() {
  try {
    // Ensure build directory exists
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: siteUrl });
    
    // Write sitemap to file
    const writeStream = fs.createWriteStream(sitemapPath);
    stream.pipe(writeStream);

    // Add pages to sitemap
    const links = pages.map(page => ({
      url: page.url,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: new Date().toISOString(),
    }));

    // Create a readable stream from the links
    const linkStream = Readable.from(links);
    
    // Pipe the links to the sitemap stream
    linkStream.pipe(stream);

    // Wait for the sitemap to be generated
    await streamToPromise(linkStream);
    stream.end();

    console.log(`Sitemap generated at: ${sitemapPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
