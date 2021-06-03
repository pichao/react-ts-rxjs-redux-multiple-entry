import React from 'react';
import styles from './index.scss';
import A from 'components/index';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
export default (props: HelloWorldProps) => {
    console.log(process.env, 'dsfgs');
    console.log(props, 'props');
    return (
        <div>
            <img src={require('assets/a.jpg')} />
            <div>qqqqqqqq</div>
            <div className={styles.users}>这是users谢谢大V查下页面</div>
        </div>
    );
};
