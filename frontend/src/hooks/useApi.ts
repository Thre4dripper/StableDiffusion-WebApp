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
    isLoading: boolean
    error: string | null
    isFinished: boolean
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
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [isFinished, setIsFinished] = useState<boolean>(false)

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
                setIsFinished(true)
            })
            .catch((error: AxiosError) => {
                setError(error.message)
                setIsLoading(false)
            })
    }, [url, method, headers, body, onDownloadProgress, onUploadProgress, params])

    const reset = () => {
        setData(null)
        setIsLoading(false)
        setError(null)
        setIsFinished(false)
    }

    return {
        data,
        isLoading,
        error,
        isFinished,
        callApi,
        reset,
    }
}

export default useApi
