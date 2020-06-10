/**
 * @description 图片展示组件
 */
import * as React from 'react';
import { useRef } from 'react';
import { useHover } from '@kzui/hooks';
import classNames from 'classnames';
import Icon from '../icon/index';
import './image-card.less';

const ImageCard = (props) => {
    const clsPrefix = 'kui-image-card';
    const { className, style, url } = props;
    const cls = classNames(clsPrefix, className);
    const imageStyle = {
        width: '104px',
        height: '104px',
        objectFit: 'none',
    };

    const ref = useRef(null)
    const hover = useHover(ref)

    function handleDelete() {
        props.onDelete && props.onDelete()
    }

    return (
        <div ref={ref} className={cls} style={style}>
            <img style={imageStyle} src={url} />
            <div className={`${clsPrefix}-cover`} style={{ display: hover ? 'block' : 'none' }}>
                <Icon onClick={handleDelete} className={`${clsPrefix}-delete`} type="delete" />
            </div>
        </div> 
    )
}

ImageCard.defaultProps = {
    url: '',
    onDelete: () => null,
    style: {}
};

// ImageCard.propTypes = {
//     url: PropTypes.string,
//     onDelete: PropTypes.func,
// };

export default ImageCard;
