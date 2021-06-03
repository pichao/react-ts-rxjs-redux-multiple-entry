import * as React from 'react';
import styles from './index.scss';
import A from 'components/index';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
export default (props: HelloWorldProps) => {
    console.log(process.env, 'dsfgs');

    return (
        <div>
            <img src={require('assets/a.jpg')} />
            <A />
            <div className={styles.about}>这是about页面</div>
        </div>
    );
};
