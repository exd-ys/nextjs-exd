export type BaseResponse<T> = {
  data?: T
  errorCode?: string
}

export type Response<T> = BaseResponse<T> & {
  success?: boolean
  errorCode?: string
}
