import { useEffect, useState } from 'react'
import { RequestConfig } from '@kzui/utils/dist/request/types';

// TODO 迁出到 @kzui/hooks 里去

interface ResponseData<T> {
    data?: T
    error: any
    loading: boolean
    run: () => Promise<void>
}

interface HookOptions {
    shouldExcute?: boolean
}

/**
 * 请求hook
 * 可用于简单的get接口获取数据(无分页)
 * @param {RequestParams} requestParams { url, payload } or url
 * @param dep useEffect dep
 * 
 * ```js
 * 
 * const { data = { items: {} } } = useRequest<{ items: Group }>(GOODS_GROUP_LIST)
 * 
 * const { data = { items: {} } } = 
 *    useRequest<{ items: Group }>({ url: GOODS_GROUP_LIST }, {}, [])
 * ```
 */
function useRequest<T>(
    requestConfigOrUrl: Partial<RequestConfig> | string,
    options?: HookOptions,
    dep?: any[]
): ResponseData<T> {

    let payload: Partial<RequestConfig>['payload'] = {};
    let url: Partial<RequestConfig>['url'] = '';
    let headers: Partial<RequestConfig>['headers'] = {};

    let shouldExcute: boolean = true;
    if (options?.shouldExcute !== undefined) {
        shouldExcute = options.shouldExcute
    }

    if (typeof requestConfigOrUrl === 'string') {
        url = requestConfigOrUrl
    } else {
        url = requestConfigOrUrl.url
        payload = requestConfigOrUrl.payload
        headers = requestConfigOrUrl.headers
    }

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<T>()
    const [error, setError] = useState()

    function run(): Promise<void> {
        setLoading(true)
        return request({
            url,
            payload,
            headers
        }).then((_data: T) => {
            setData(_data)
            setLoading(false)
        }).catch((e) => {
            setError(e)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (shouldExcute) {
            run()
        }
    }, dep || [])

    return {
        data,
        error,
        loading,
        run
    }
}

const createUseRequest = (_request) => {
    request = _request

    return useRequest
}

export default useRequest;