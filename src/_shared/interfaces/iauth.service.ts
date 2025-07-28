import { Response } from '@/_shared/models/response-model'
import { PasswordSignInRequest } from '../models/auth/password-signin-model'
import { SignUpRequest } from '../models/auth/sign-up-model'

export interface IAuthService {
  signUp(request: SignUpRequest): Promise<Response<void>>
  signInWithEmail(request: PasswordSignInRequest): Promise<Response<void>>
  logout(): Promise<Response<void>>
}
