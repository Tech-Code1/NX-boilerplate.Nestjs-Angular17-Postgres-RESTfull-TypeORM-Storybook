import { CLIENT_URL } from '@environments';
export function generateResetLink(token: string, id: string): string {
  return `${CLIENT_URL}/reset-pass?token=${token}&id=${id}`;
}
