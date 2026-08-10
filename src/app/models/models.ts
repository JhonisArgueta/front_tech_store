export interface AuthRequest {
  email: string;
  password: string;
  name?: string; // Opcional para login, obligatorio para sign up
}

export interface AuthResponse {
  token: string;
  type?: string;
}