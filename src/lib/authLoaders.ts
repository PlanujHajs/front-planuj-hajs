import { loginAuthTokenPost } from '@/api/auth/auth';
import { BodyLoginAuthTokenPost } from '@/api/types';
import { redirect } from 'react-router';
import ROUTES from './consts/routes';

export async function loginAction({ request }: { request: Request }) {
  const form = await request.formData();
  const body = {
    username: form.get('username'),
    password: form.get('password'),
  } as BodyLoginAuthTokenPost;

  const tokenData = await loginAuthTokenPost(body);

  localStorage.setItem('authToken', tokenData.access_token);

  return redirect(ROUTES.APP.DESKTOP.URL);
}

export function requireGuest(): null {
  const token = localStorage.getItem('authToken');
  if (token) redirect(ROUTES.APP.DESKTOP.URL);
  return null;
}

export function requireAuth() {
  const token = localStorage.getItem('authToken');
  if (!token) redirect(ROUTES.AUTH.LOGIN.URL);
  return null;
}

export function logoutAction() {
  localStorage.removeItem('authToken');
  return redirect(ROUTES.AUTH.LOGIN.URL);
}
