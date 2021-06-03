import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError, mergeMap } from 'rxjs/operators';
import querystring from 'querystring';
interface Params {
    url: string;
    method?: string;
    payload?: object;
    [propName: string]: any;
}
interface CallbackObj {
    error?: (data?) => void;
    success?: (data?) => void;
}
export const handleAjax = (params: Params, callback?: CallbackObj) => {
    let method = params.method || 'GET';
    let requestObj: any = {
        payload: {},

        ...params,
    };
    if (method.toLowerCase() === 'post') {
        requestObj = {
            headers: {
                'Content-Type': 'application/json',
                'rxjs-custom-header': 'Rxjs',
            },
            ...params,

            body: {
                ...params.payload,
            },
        };
    } else if (method.toLowerCase() === 'get' && Object.values(requestObj.payload).length) {
        requestObj = {
            ...params,
            url: `${params.url}?${querystring.stringify(requestObj.payload)}`,
        };
    }
    delete requestObj.payload;
    console.log(requestObj, 'requestObj');
    return ajax({
        ...requestObj,
    }).pipe(
        catchError((err) => {
            if (callback && callback.error && typeof callback.error === 'function') {
                callback.error(err);
            }
            handleStatus(err);
            /* 
            此处添加状态码处理
            */
            return of(null);
        }),
        map((data) => {
            if (data) {
                if (callback && callback.success && typeof callback.success === 'function') {
                    callback.success(data.response);
                }

                return data.response;
            }

            return null;
        }),
    );
};

/* 
状态码处理函数
*/
const handleStatus = (error) => {
    console.log(error, 'error');
    if (error.status === 404) {
        console.log('404');
    }
};
