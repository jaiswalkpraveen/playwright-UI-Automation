const { test, expect } = require('../utils/testRunner');
const searchData = require('../data/searchData');
const { searchScenarios } = require('../data/searchScenario');

/**
 * Test suite for the search functionality on the map page.
 * These tests cover basic search operations and result validations.
 */
test.describe('Search Functionality', () => {
  test('should display correct results for a valid search query', async ({ searchPage }) => {
    // Arrange
    const { searchKeyword, expectedVenue, expectedLocation } = searchData;
    // Act
    await searchPage.performSearch(searchKeyword);
    // Assert
    const resultItem = await searchPage.getSearchResultItem(expectedVenue, expectedLocation);
    await expect(resultItem).toBeVisible();
    const venueName = await searchPage.getVenueName(resultItem);
    const venueLocation = await searchPage.getVenueLocation(resultItem);
    expect(venueName).toBe(expectedVenue);
    expect(venueLocation).toBe(expectedLocation);
  });

  test('should display "No results found" for an invalid search query', async ({ searchPage }) => {
    // Arrange
    const nonexistentQuery = 'nonexistentquery123456';
    // Act
    await searchPage.performSearch(nonexistentQuery);
    // Assert
    await expect(searchPage.getNoResultsMessage()).toBeTruthy();
  });

  for (const scenario of searchScenarios) {
    test(`should return correct number of results for "${scenario.query}" search`, async ({ searchPage }) => {
      await searchPage.performSearch(scenario.query);
      const resultCount = await searchPage.getSearchResultCount();
      expect(resultCount).toBe(scenario.expectedResultCount);
    });
  }
});