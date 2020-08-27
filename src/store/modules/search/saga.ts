import { BritboxSearchApi } from '@src/sdks';

export async function getSearch(accessToken: string, term: string, isDone: boolean) {
  const { get } = BritboxSearchApi();

  try {
    const response = await get({
      term,
      maxResults: isDone ? undefined : 6,
      useCustomId: true,
    });

    return { response };
  } catch (error) {
    return error;
  }
}
