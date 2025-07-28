import { Container } from 'inversify'
import 'reflect-metadata'
import { CONTAINER_IDENTIFIER } from '../constants'
import { IAuthService } from '../interfaces/iauth.service'
import { AuthService } from './auth/auth.service'

const container = new Container()

export default container

container
  .bind<IAuthService>(CONTAINER_IDENTIFIER.IAUTH_SERVICE)
  .to(AuthService)
  .inSingletonScope()
