import { useState, useCallback } from 'react'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface UseApiConfig {
    url: string
    method?: RequestMethod
}

interface CallFunction<T> {
    body: T
    token?: string
    onSuccess: (data: AxiosResponse | null) => void
    onError: (error: string) => void
}

interface UseApiResult {
    callApi: <T>(callFunction: CallFunction<T>) => void
    isLoading: boolean
    isSuccess: boolean
    isFailed: boolean
    isIdle: boolean
}

const useApi = ({ url, method = RequestMethod.GET }: UseApiConfig): UseApiResult => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [isFailed, setIsFailed] = useState<boolean>(false)

    const callApi = useCallback(
        <T>({ body, token, onSuccess, onError }: CallFunction<T>) => {
            setIsLoading(true)

            const axiosConfig: AxiosRequestConfig = {
                url,
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: body,
                timeout: 120000,
                timeoutErrorMessage: 'Request timed out',
            }

            if (token) axiosConfig.headers!['Authorization'] = `Bearer ${token}`

            axios(axiosConfig)
                .then((response: AxiosResponse) => {
                    setIsLoading(false)
                    setIsSuccess(true)
                    onSuccess(response)
                })
                .catch((error: AxiosError) => {
                    setIsFailed(true)
                    setIsLoading(false)
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onError(error.response?.data?.error || 'Something went wrong')
                    console.log(error)
                })
        },
        [url, method]
    )

    return {
        callApi,
        isLoading,
        isSuccess,
        isFailed,
        isIdle: !isLoading && !isSuccess && !isFailed,
    }
}

export default useApi
