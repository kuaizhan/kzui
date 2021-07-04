const ParamsException = (error) => {
    this.message = error;
};

export const upperFirst = str => `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`;
export const trim = str => str.trim();
export const get = selector => document.querySelector(selector) || null;
export const getAll = selector => document.querySelectorAll(selector) || [];
export const getElementFromString = (str) => {
    const div = document.createElement('div');
    div.insertAdjacentHTML('afterbegin', str);
    return this.firstChild(div);
};

export const findAll = (parent, selector) => {
    if (parent.nodeType !== 1) {
        return [];
    }
    const ret = [];
    const els = document.querySelectorAll(selector) || [];
    for (let i = 0; i < els.length; i += 1) {
        if (parent.contains(els[i])) {
            ret.push(els[i]);
        }
    }
    return ret;
};

export const find = (parent, selector) => {
    if (parent.nodeType !== 1) {
        return [];
    }
    const els = document.querySelectorAll(selector) || [];
    for (let i = 0; i < els.length; i += 1) {
        if (parent.contains(els[i])) {
            return els[i];
        }
    }
    return null;
};

export const next = (el) => {
    const par = el.parentNode;
    const last = par.lastChild;
    let cur = el.nextSibling;
    while (cur.nodeType !== 1 && cur.nodeType !== 9) {
        if (cur === last) {
            return null;
        }
        cur = cur.nextSibling;
    }
    return cur;
};

export const firstChild = (parent) => {
    let first = parent.firstChild;
    while (first && (first.nodeType !== 1 && first.nodeType !== 9)) {
        first = first.nextSibling;
    }
    return first;
};

export const lastChild = (parent) => {
    let last = parent.lastChild;
    while (last && (last.nodeType !== 1 && last.nodeType !== 9)) {
        last = last.previousSibling;
    }
    return last;
};

export const children = (parent, selector) => {
    if (parent.nodeType !== 1 && parent.nodeType !== 9) {
        return [];
    }
    const ret = [];
    let nativeNodes;
    let i;
    if (selector) {
        const matchSelector = parent.matches ||
        parent.webkitMatchesSelector ||
        parent.mozMatchesSelector ||
        parent.msMatchesSelector;
        if (matchSelector) {
            nativeNodes = parent.childNodes;
            for (i = 0; i < nativeNodes.length; i += 1) {
                if (nativeNodes[i].nodeType === 1 &&
                    matchSelector.call(nativeNodes[i], selector)) {
                    ret.push(nativeNodes[i]);
                }
            }
        }
    } else {
        nativeNodes = parent.childNodes;
        for (i = 0; i < nativeNodes.length; i += 1) {
            if (nativeNodes[i].nodeType === 1) {
                ret.push(nativeNodes[i]);
            }
        }
    }
    return ret;
};

export const parent = (el) => {
    if (el.nodeType !== 1 && el.nodeType !== 9) {
        return null;
    }
    return el.parentNode;
};

export const parents = (el, selector) => {
    let curEl = el;
    const matchSelector = el.matches ||
        el.webkitMatchesSelector ||
        el.mozMatchesSelector ||
        el.msMatchesSelector;
    if (matchSelector) {
        while (curEl !== document.body) {
            if (matchSelector.call(curEl, selector)) {
                return curEl;
            }
            curEl = curEl.parentNode;
        }
    }
    return null;
};

export const append = (el, parentNode) => {
    if (parentNode.nodeType !== 1 && parentNode.nodeType !== 9) {
        return;
    }

    if (el.nodeType && el.nodeType === 1) {
        parentNode.appendChild(el);
    } else {
        parentNode.insertAdjacentHTML('beforeend', el);
    }
};

export const prepend = (el, parentNode) => {
    if (parentNode.nodeType !== 1 && parentNode.nodeType !== 9) {
        return;
    }

    if (el.nodeType && el.nodeType === 1) {
        parentNode.insertBefore(el, parentNode.firstChild);
    } else {
        parentNode.insertAdjacentHTML('afterbegin', el);
    }
};

export const insertBefore = (el, target) => {
    if (target.nodeType !== 1 && target.nodeType !== 9) {
        return;
    }
    const parentNode = target.parentNode;

    if (el.nodeType && el.nodeType === 1) {
        parentNode.insertBefore(el, target);
    } else {
        const div = document.createElement('div');
        div.innerHTML = el;
        const els = div.childNodes;
        for (let i = 0; i < els.length; i += 1) {
            if (els[i].nodeType === 1) {
                parentNode.insertBefore(els[i], target);
            }
        }
    }
};

export const insertAfter = (el, target) => {
    if (target.nodeType !== 1 && target.nodeType !== 9) {
        return;
    }
    const parentNode = target.parentNode;

    if (el.nodeType && el.nodeType === 1) {
        if (target === parentNode.lastChild) {
            parentNode.appendChild(el);
        } else {
            parentNode.insertBefore(el, target.nextSibling);
        }
    } else {
        const div = document.createElement('div');
        div.innerHTML = el;
        const els = div.childNodes;
        for (let i = els.length - 1; i >= 0; i -= 1) {
            if (target === parentNode.lastChild) {
                parentNode.appendChild(els[i]);
            } else {
                parentNode.insertBefore(els[i], target.nextSibling);
            }
        }
    }
};

export const remove = (el) => {
    if (!el) {
        return;
    }
    if (el.nodeType !== 1 && el.nodeType !== 9) {
        return;
    }
    el.parentNode.removeChild(el);
};

export const empty = (el) => {
    if (!el) {
        return;
    }
    if (el.nodeType !== 1 && el.nodeType !== 9) {
        return;
    }
    el.innerHTML = '';
};

export const hasClass = (el, name) => {
    const className = el.className;
    const reg = new RegExp(name);
    return reg.test(className);
};

export const removeClass = (el, name) => {
    let className = el.className;
    const reg = new RegExp(`(?:^|\\s)(${name})(?:\\s|$)`, 'g');
    className = className.replace(reg, () => ' ');
    el.className = trim(className);
};

export const toggleClass = (el, name) => {
    let className = el.className;
    const reg = new RegExp(`(?:^|\\s)(${name})(?:\\s|$)`, 'g');
    if (!reg.test(className)) {
        className += ` ${name}`;
        el.className = className;
    } else {
        className = className.replace(reg, ' ');
    }
    el.className = trim(className);
};

export const show = (el) => {
    el.style.display = 'block';
};

export const hide = (el) => {
    el.style.display = 'none';
};

export const css = (el, v) => {
    if (el.nodeType !== 1 && el.nodeType !== 9) {
        return;
    }
    if (Object.prototype.toString.call(v) === '[object Object]') {
        Object.keys(v).forEach((attr) => {
            el.style[attr] = v[attr];
        });
    } else {
        throw new ParamsException('params error!');
    }
};

export const getStyle = (el, k) => {
    let currentStyle;
    let getComputedStyle = null;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        currentStyle = null;
        getComputedStyle = (elem, name) => {
            let ret;
            const rupper = /([A-Z]|^ms)/g;
            name = name.replace(rupper, '-$1').toLowerCase();
            const defaultView = elem.ownerDocument && elem.ownerDocument.defaultView;
            if (!defaultView) {
                return undefined;
            }

            const computedStyle = defaultView.getComputedStyle(elem, null);
            if (computedStyle) {
                ret = computedStyle.getPropertyValue(name);
            }
            return ret;
        };
    } else if (document.documentElement.currentStyle) {
        getComputedStyle = null;
        currentStyle = (elem, name) => {
            let left;
            let rsLeft;
            let ret = elem.currentStyle && elem.currentStyle[name];
            const style = elem.style;
            const rnumpx = /^-?\d+(?:px)?$/i;
            const rnum = /^-?\d/;
            const uncomputed = style[name];
            if (ret === null && style && uncomputed) {
                ret = uncomputed;
            }

            if (!rnumpx.test(ret) && rnum.test(ret)) {
                left = style.left;
                rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
                if (rsLeft) {
                    elem.runtimeStyle.left = elem.currentStyle.left;
                }
                style.left = name === 'fontSize' ? '1em' : (ret || 0);
                ret = `${style.pixelLeft}px`;
                style.left = left;
                if (rsLeft) {
                    elem.runtimeStyle.left = rsLeft;
                }
            }
            return ret === '' ? 'auto' : ret;
        };
    } else {
        getComputedStyle = null;
        currentStyle = null;
    }
    const styleFn = getComputedStyle || currentStyle;
    return styleFn(el, k);
};

export const attr = (el, arg1, arg2) => {
    if (arguments.length === 2) {
        if (arg1.toString() === '[object Object]') {
            Object.keys(arg1).forEach((key) => {
                el.setAttribute(key, arg1[key]);
            });
        } else {
            return el.getAttribute(arg1);
        }
    } else if (arguments.length === 3) {
        el.setAttribute(arg1, arg2);
    } else {
        throw new ParamsException('params error');
    }
};

export const animate = (el, v) => {
    if (el.nodeType !== 1 && el.nodeType !== 9) {
        return;
    }
    if (Object.prototype.toString.call(v) === '[object Object]') {
        Object.keys(v).forEach((key) => {
            el.style[key] = v[key];
        });
    } else {
        throw new ParamsException('params error');
    }
};

export const outerHeight = (el) => {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    const margin = parseFloat(getStyle(el, 'paddingTop')) +
                   parseFloat(getStyle(el, 'paddingBottom')) +
                   parseFloat(getStyle(el, 'border-top')) +
                   parseFloat(getStyle(el, 'border-bottom'));
    const height = getStyle(el, 'height');
    return Math.ceil(parseFloat(height) + margin);
};

export const outerWidth = (el) => {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    const margin = parseFloat(getStyle(el, 'paddingLeft')) +
                   parseFloat(getStyle(el, 'paddingRight')) +
                   parseFloat(getStyle(el, 'border-left')) +
                   parseFloat(getStyle(el, 'border-right'));
    const width = getStyle(el, 'width');
    return Math.ceil(parseFloat(width) + margin);
};

export const position = (el) => {
    el = (typeof el === 'string') ? document.querySelector(el) : el;
    return {
        left: el.offsetLeft,
        top: el.offsetTop,
    };
};
