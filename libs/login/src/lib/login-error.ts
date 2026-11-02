import { AuthError } from '@garage/ui-lib';

export function toMessage(err: unknown): string {
  return err instanceof AuthError ? err.message : 'Something went wrong. Please try again.';
}
