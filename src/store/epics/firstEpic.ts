import { ofType, combineEpics, createEpicMiddleware } from 'redux-observable';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { handleAjax } from 'utils/index';
export const userEpic = (action$) => {
    return action$.pipe(
        ofType('rotate'),
        mergeMap((action: any) =>
            handleAjax(
                {
                    url: '/api',
                    method: 'get',
                    payload: {
                        per: 2,
                    },
                },
                {
                    error: () => {
                        console.log('cuole');
                    },
                },
            ),
        ),
        map((data) => {
            console.log(data, '最终data');
            if (!data) {
                return {
                    type: '@REQUEST_ERROR', // 全局请求错误action
                    payload: {},
                };
            }
            /* 
           此处返回请求成功的业务action
           */
            return {
                type: 'GET_USER_SUCCESS',
                payload: {
                    a: 'a',
                },
            };
        }),
    );
};

export const addTodoEpic = (action$) =>
    action$.pipe(
        ofType('ADD_TODO'),
        map((action: any) => ajax.getJSON('/api')),
        map((data: any) => data.response),
        map((todo) => ({ type: 'ADD_TODO_SUCCESS', payload: todo })),
    );
