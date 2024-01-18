import { useState, useCallback } from 'react'
import axios, { AxiosError, AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from 'axios'

interface UseApiConfig {
    url: string
    method?: AxiosRequestConfig['method']
    headers?: AxiosRequestConfig['headers']
    body?: AxiosRequestConfig['data']
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
    params?: AxiosRequestConfig['params']
}

interface UseApiResult {
    data: AxiosResponse | null
    error: string | null
    isLoading: boolean
    isSuccess: boolean
    isFailed: boolean
    callApi: () => void
    reset: () => void
}

const useApi = ({
    url,
    method = 'GET',
    headers,
    body,
    onDownloadProgress,
    onUploadProgress,
    params,
}: UseApiConfig): UseApiResult => {
    const [data, setData] = useState<AxiosResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [isFailed, setIsFailed] = useState<boolean>(false)

    const callApi = useCallback(() => {
        setIsLoading(true)

        axios({
            url,
            method,
            headers,
            data: body,
            onDownloadProgress,
            onUploadProgress,
            params,
        })
            .then((response: AxiosResponse) => {
                setData(response)
                setIsLoading(false)
                setIsSuccess(true)
            })
            .catch((error: AxiosError) => {
                setError(error.message)
                setIsFailed(true)
                setIsLoading(false)
            })
    }, [url, method, headers, body, onDownloadProgress, onUploadProgress, params])

    const reset = () => {
        setData(null)
        setIsLoading(false)
        setError(null)
        setIsSuccess(false)
    }

    return {
        data,
        error,
        isLoading,
        isSuccess,
        isFailed,
        callApi,
        reset,
    }
}

export default useApi
