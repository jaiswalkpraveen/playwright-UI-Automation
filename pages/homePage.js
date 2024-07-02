class HomePage {
    constructor(page) {
      this.page = page;
      this.images = page.locator('img'); // Selects all images on the page
      this.headers = page.locator('h3'); // Selects all h3 elements
      this.spans = page.locator('span'); // Selects all span elements
    }

    async navigate() {
        await this.page.goto('https://staging-website.privilee.ae/map');
        await this.page.waitForLoadState('domcontentloaded');
      }
  
    async getVisibleImageCount() {
      return await this.images.count();
    }
  
    async getHeaderCount() {
      return await this.headers.count();
    }
  
    async getDescriptionCount() {
      return await this.spans.count();
    }
  
  
    async getAllHeaders() {
      return await this.headers.all();
    }
  
    async getAllSpans() {
      return await this.spans.all();
    }

    async waitForImage() {
        await this.page.waitForSelector(this.page.images);
      }
    
      async isElementInViewport(elementLocator) {
        const elementHandle = await elementLocator.first();
        const boundingBox = await elementHandle.boundingBox();
        const viewportSize = await this.page.viewportSize();
    
        return (
          boundingBox.x >= 0 &&
          boundingBox.y >= 0 &&
          boundingBox.x + boundingBox.width <= viewportSize.width &&
          boundingBox.y + boundingBox.height <= viewportSize.height
        );
      }
    
      async isImageInViewport() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('img', { state: 'visible' });
        return await this.isElementInViewport(this.images);
      }

      async getVisibleImages() {
        return this.page.$$eval('img:visible', (imgs) => {
          return imgs.filter((img) => {
            const rect = img.getBoundingClientRect();
            return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= window.innerHeight &&
              rect.right <= window.innerWidth
            );
          }).map((img) => ({
            src: img.src,
            alt: img.alt,
            width: img.width,
            height: img.height,
          }));
        });
      }
      
  }
  
  module.exports = HomePage;
  