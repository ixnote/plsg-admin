export const baseURL = () => process.env.NEXT_PUBLIC_BASE_URL
export const constructURL = (baseUrl: any, path: string) => `${baseURL()}/${path}`;