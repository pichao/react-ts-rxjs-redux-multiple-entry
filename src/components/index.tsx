import * as React from 'react';
import styles from './index.scss';

export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
export default (props: HelloWorldProps) => {
    console.log(process.env, 'dsfgs');

    return <h1 className={styles.aaa}>Hi from React! Welcome to</h1>;
};
