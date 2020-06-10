import PropTypes from 'prop-types';

// 组件尺寸
export const uiSizeType = PropTypes.oneOf(['tiny', 'normal', 'small', 'large', 'huge']);

// 表单值类型
export const valueType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
]);

export const optionListType = PropTypes.arrayOf(PropTypes.shape({
    value: valueType,
    text: PropTypes.string,
}));

export const dimensionType = PropTypes.shape({
    left: valueType,
    top: valueType,
    width: valueType,
    height: valueType,
});

export const singleChildNode = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
]);

export const childrenType = PropTypes.oneOfType([
    singleChildNode,
    PropTypes.arrayOf(singleChildNode),
]);

export const textNavItemsType = PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    cur: PropTypes.bool,
}));

export const iconNavItemsType = PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    iconClass: PropTypes.string,
    cur: PropTypes.bool,
}));

export default {
    uiSizeType,
    valueType,
    optionListType,
    dimensionType,
    childrenType,
    textNavItemsType,
    iconNavItemsType,
    singleChildNode,
};
