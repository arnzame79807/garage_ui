export interface User {
  id: string;
  email: string;
  displayName: string;
  roles: readonly string[];
}
