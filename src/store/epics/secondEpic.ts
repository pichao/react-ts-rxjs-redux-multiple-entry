import { ofType, combineEpics, createEpicMiddleware } from 'redux-observable';
import { map, flatMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export const userEpic = (action$) =>
    action$.pipe(
        ofType('GET_USER'),

        map((user) => ({ type: 'GET_USER_SUCCESS', payload: user })),
    );
