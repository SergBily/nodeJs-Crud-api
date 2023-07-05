export const createEndpointId = (endpoint: string) => `${endpoint?.split('/').slice(0, -1).join('/')}/:id`;
