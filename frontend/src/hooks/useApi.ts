import { useState, useCallback } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

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

interface CallFunction {
    body: any
    token?: string
    onSuccess: (data: AxiosResponse | null) => void
    onError: (error: string) => void
}

interface UseApiResult {
    callApi: (callFunction: CallFunction) => void
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
        ({ body, token, onSuccess, onError }: CallFunction) => {
            setIsLoading(true)

            const axiosConfig: AxiosRequestConfig = {
                url,
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: body,
            }

            if (token) axiosConfig.headers!['Authorization'] = `Bearer ${token}`

            axios(axiosConfig)
                .then((response: AxiosResponse) => {
                    setIsLoading(false)
                    setIsSuccess(true)
                    onSuccess(response)
                })
                .catch((error: any) => {
                    setIsFailed(true)
                    setIsLoading(false)
                    onError(error.error)
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
