const { test, expect } = require('../utils/testRunner');

test.describe('Homepage Tests', () => {
  test('Verify homepage images', async ({ homePage }) => {
    const visibleImages = await homePage.getVisibleImages();
    
    expect(visibleImages.length, 'At least one image should be found').toBeGreaterThan(0);

    for (const img of visibleImages) {
      console.log(`Asserting image: ${img.src}`);
      expect(img.src, 'Image should have a valid source').toBeTruthy();
      expect(img.alt, 'Image should have an alt attribute').toBeDefined();
      expect(img.width, 'Image width should be greater than 0').toBeGreaterThan(0);
      expect(img.height, 'Image height should be greater than 0').toBeGreaterThan(0);
      expect(img.width, 'Image width should not exceed 1920px').toBeLessThanOrEqual(1920);
      expect(img.height, 'Image height should not exceed 1080px').toBeLessThanOrEqual(1080);
    }
  });

  test('Verify homepage headers and descriptions', async ({ homePage }) => {
    const headerCount = await homePage.getHeaderCount();
    const descriptionCount = await homePage.getDescriptionCount();
    const allHeaders = await homePage.getAllHeaders();
    const allDescriptions = await homePage.getAllSpans();

    expect(headerCount, 'There should be at least one header').toBeGreaterThan(0);
    expect(descriptionCount, 'There should be at least one description').toBeGreaterThan(0);

    for (const header of allHeaders) {
      const headerText = await header.innerText();
      expect(headerText, 'Header text should not be empty').not.toEqual('');
    }

    for (const description of allDescriptions) {
      const descriptionText = await description.innerText();
      expect(descriptionText, 'Description text should not be empty').not.toEqual('');
    }
  });
});