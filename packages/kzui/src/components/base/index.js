import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from './config';
import KZUIError from './error';

const isDefined = v => v !== undefined;

const objectFilter = (obj, fn) =>
    Object.keys(obj)
        .filter(key => fn(obj[key]))
        .reduce((pre, cur) => ({
            ...pre,
            [cur]: obj[cur],
        }), {});

const filterUndefined = obj => objectFilter(obj, isDefined);

class KZUIComponent extends Component {
    constructor(props) {
        super(props);
        this.autoBind('classname', 'innerInitStateFromProps');
        this.innerInitFlag = true;
        this.innerInitStateFromProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.innerInitFlag = false;
        this.innerInitStateFromProps(nextProps);
    }
// raise an error
    raiseError(code, message) {
        const e = new KZUIError(code, message);
        if (this.props.onError) {
            this.props.onError(e);
        } else {
            throw e;
        }
    }

    // init internal state from props
    // eslint-disable-next-line no-unused-vars,class-methods-use-this
    innerInitStateFromProps(props) {
        const newState = this.initStateFromProps(props);
        if (!newState) return;

        if (this.innerInitFlag) {
            this.state = newState;
        } else {
            this.setState(filterUndefined(newState));
        }
    }
    initStateFromProps() {}

    // TODO
    classname(name, stateClasses = {}, noPrefix, noPropCls) {
        const baseName = noPrefix ? name : `${config.cssPrefix}${name}`;
        const classNames = [baseName];
        Object.keys(stateClasses).forEach((stateName) => {
            if (stateClasses[stateName]) {
                classNames.push(stateName);
            }
        });

        if (!noPropCls && this.props.className) {
            classNames.push(this.props.className);
        }
        return classNames.join(' ');
    }

    /**
     * bind event handler for performance reason
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
     */
    autoBind(...args) {
        for (let i = 0; i < args.length; i += 1) {
            const func = this[args[i]];
            if (func) {
                this[args[i]] = func.bind(this);
            }
        }
    }

    /**
     * store an DOM element in refs
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
     */
    storeRef(name) {
        return (c) => {
            this[name] = c;
        };
    }

    render() {
        return <div />;
    }
}

KZUIComponent.defaultProps = {
    className: '',
    onError: null,
};

KZUIComponent.propTypes = {
    className: PropTypes.string,
    onError: PropTypes.func,
};

export default KZUIComponent;
