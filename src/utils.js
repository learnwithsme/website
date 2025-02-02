import React from "react";

/** 
 * Check if an object is empty
 * 
 * fastest option in https://stackoverflow.com/a/59787784
 */
export const objectIsEmpty = (object) => { for (let k in object) return false; return true; }

/**
 *  Wrap an element conditionally
 * 
 *  https://stackoverflow.com/a/56870316/
 * 
 * @param {{
 *  condition: boolean
 *  wrapper: (wrappedChildren: React.JSX.Element)=>React.JSX.Element
 *  children: React.JSX.Element
 * }} 
 * @returns A wrapped or unwrapped element, depending on `condition`
 */
export const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

/**  https://stackoverflow.com/a/61511955
 */
export const waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};


// This code is so that Javascript (and stuff like setState) can work in mdx files
// Useful for interactivity
//
// =======================================
// Copied from https://github.com/alexkrolick/mdx-observable/blob/master/src/index.js

const StoreContext = React.createContext({ setState: () => { } });

// provides {...state, setState} as context as well as render prop
// if the children prop is a function
class State extends React.Component {
    static defaultProps = {
        initialState: {}
    };

    state = {
        ...this.props.initialState,
        setState: update => this.setState(update)
    };

    render() {
        return (
            <StoreContext.Provider value={this.state}>
                <React.Fragment>
                    {typeof this.props.children === "function"
                        ? this.props.children(this.state)
                        : this.props.children}
                </React.Fragment>
            </StoreContext.Provider>
        );
    }
}

class Observe extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <StoreContext.Consumer>{store => children(store)}</StoreContext.Consumer>
        );
    }
}

export { State, Observe };

// end copy
// ====================================