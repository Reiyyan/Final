import * as React from 'react';
import Wordly from './Wordly';
export default function Home(props) {
    return (
        <>
            <Wordly dark={props.theme}/>
        </>
    );
}