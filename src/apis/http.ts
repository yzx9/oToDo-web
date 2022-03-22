import { hasSignIn, accessToken, updateAccessToken } from "../session"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import _JsonBigInt from "json-bigint-fix"

const JsonBigInt = _JsonBigInt({ useNativeBigInt: true })

async function requestSuccess(config: AxiosRequestConfig<any>) {
  if (config.headers && hasSignIn.value) {
    config.headers["Authorization"] = `Bearer ${accessToken.value}`
  }

  return config
}

async function requestFail(error: any) {
  throw error.toJSON()
}

async function responseFail(error: AxiosError) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        error.message = "用户名或密码错误，请重试"
        break
      case 412:
        error.message = "客户端请求信息的先决条件错误"
        break
      case 401: // unauthorized
        error.message = "登录失效，请重新登录"
        break
      case 500: // 服务器内部错误
      case 502: // Bad Gateway
      case 504: // Gateway Time-out
      case 505: // HTTP Version not supported
        error.message = "服务器未响应，请联系管理员"
        break
      case 503: // 服务器繁忙
        error.message = "服务器繁忙，请重试"
        break
      case 501: // 请求方法不支持
        error.message = "服务器不支持请求的功能，无法完成请求"
        break
      default:
        error.message = "系统异常，请联系管理员"
        break
    }
  } else if (error.message === "Network Error") {
    error.message = "请检查网络连接是否正常"
  }

  throw error
}

const authorizationReg = /^[Bb]earer (\s+)$/
async function responseSuccess(response: AxiosResponse<any, any>) {
  // Check response headers if contains new access token
  const authorization = response.headers["authorization"]
  if (authorization && authorizationReg.test(authorization)) {
    const token = authorization.match(authorizationReg)!
    updateAccessToken(token[1])
  }

  return response
}

function NewHTTPInstance() {
  const instance = axios.create({
    baseURL: import.meta.env.OTODO_API_URI as string,
    timeout: 10000,
    transformResponse: [(data) => JsonBigInt.parse(data)],
    transformRequest: [
      (data, headers) => {
        if (headers) {
          headers["Content-Type"] = "application/json"
        }
        return JsonBigInt.stringify(data)
      },
    ],
  })

  instance.defaults.headers.post["Content-Type"] = "application/json"

  instance.interceptors.request.use(requestSuccess, requestFail)

  instance.interceptors.response.use(responseSuccess, responseFail)

  return instance
}

const instance = NewHTTPInstance()
const { delete: del, get, post, patch, put } = instance
export { del, get, post, patch, put }
