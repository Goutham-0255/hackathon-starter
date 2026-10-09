import { apiRequest } from './client';

export interface Greeting {
  message: string;
  totalVisits: number;
}

export function getGreeting(name: string) {
  return apiRequest<Greeting>(`/api/hello?name=${encodeURIComponent(name)}`);
}
