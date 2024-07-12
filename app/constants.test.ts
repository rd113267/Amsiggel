import constants from './constants';
import axios from 'axios';

describe('constants', () => {
  it('should return the correct length for each url array', () => {
    expect(constants.BERBER_VIMEO_URLS.length).toEqual(17);
    expect(constants.ENGLISH_VIMEO_URLS.length).toEqual(17);
    expect(constants.FRENCH_VIMEO_URLS.length).toEqual(17);
  });

  it('each URL should be valid and reachable', async () => {
    const checkUrl = async (url: string) => {
      try {
        const response = await axios.head(url);
        expect(response.status).toEqual(200);
      } catch (error) {
        throw new Error(`URL not reachable: ${url}`);
      }
    };

    const urls = [
      ...constants.BERBER_VIMEO_URLS,
      ...constants.ENGLISH_VIMEO_URLS,
      ...constants.FRENCH_VIMEO_URLS,
    ];

    await Promise.all(urls.map(url => checkUrl(url)));
  });
});
