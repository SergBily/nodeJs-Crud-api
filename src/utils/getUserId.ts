export const getUserId = (enpoint: string): string => enpoint.split('/').at(-1) as string;
