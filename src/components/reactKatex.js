import React from 'react';
import TeX from '@matejmazur/react-katex';

// This provides React components to include math stuff 
// Primarily used in MDX files as an alternative method to the $$ $$ method 

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