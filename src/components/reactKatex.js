import React from 'react';
import TeX from '@matejmazur/react-katex';

// https://katex.org/docs/options
const options = {
    colorIsTextColor: true // to make \color{} a function, not a switch
}

export function InlineMath({ math }) {
    return <TeX
        math={math}

        settings={options}
    />
}

export function BlockMath({ math }) {
    return <TeX
        math={math}

        block
        settings={options}
    />
} 