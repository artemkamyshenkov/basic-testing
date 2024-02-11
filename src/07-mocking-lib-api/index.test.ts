// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/posts');

    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get');

    await throttledGetDataFromApi('/posts');

    expect(axiosGetSpy).toHaveBeenCalledWith('/posts');
  });

  // test('should return response data', async () => {
  //   const responseData = [{ id: 1, title: 'Sample Post' }];
  //   // axios.get.mockResolvedValueOnce({ data: responseData });

  //   const result = await throttledGetDataFromApi('/posts');

  //   expect(result).toEqual(responseData);
  // });
});
