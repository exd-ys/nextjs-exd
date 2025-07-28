import { ERRORS } from '@/_shared/constants/errors/error-messages'
import { IAuthService } from '@/_shared/interfaces/iauth.service'
import firebase_app from '@/_shared/lib/firebase/config'
import { PasswordSignInRequest } from '@/_shared/models/auth/password-signin-model'
import { SignUpRequest } from '@/_shared/models/auth/sign-up-model'
import { Response } from '@/_shared/models/response-model'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { injectable } from 'inversify'
import 'reflect-metadata'

const auth = getAuth(firebase_app)

@injectable()
export class AuthService implements IAuthService {
  async signUp(request: SignUpRequest): Promise<Response<void>> {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        request.email,
        request.password
      )

      return { success: !!result }
    } catch (e) {
      return { errorCode: ERRORS.unexpectedError }
    }
  }

  async signInWithEmail(
    request: PasswordSignInRequest
  ): Promise<Response<void>> {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        request.email,
        request.password
      )

      return { success: !!result }
    } catch (e: any) {
      return { errorCode: e.code }
    }
  }

  async logout(): Promise<Response<void>> {
    try {
      await signOut(auth)
      return { success: true }
    } catch (e) {
      return { errorCode: ERRORS.unexpectedError }
    }
  }
}
