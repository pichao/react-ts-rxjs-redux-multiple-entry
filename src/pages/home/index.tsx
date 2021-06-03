import * as React from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
export default (props: HelloWorldProps) => {
    console.log(process.env, 'dsfgs');

    const selectedData = useSelector((state) => {
        console.log(state, 'stateyyyyyyyyyyyyy');
        return state;
    }, shallowEqual) as any;
    console.log(selectedData, 'selectedData');
    const dispatch = useDispatch();
    return (
        <div>
            <div>
                <Link to={'/index1'}>about</Link>
                {/* <Link to={'/users$'}>users</Link> */}
            </div>
            <button
                onClick={() => {
                    dispatch({
                        type: 'rotate',
                        payload: {
                            per_page: 2,
                        },
                    });
                }}
            >
                发action
            </button>
            {selectedData.showAlert ? <div>这里验证发送action</div> : null}
            <img src={require('assets/a.jpg')} />
            <div className={styles.home}>这是home页面</div>
        </div>
    );
};
