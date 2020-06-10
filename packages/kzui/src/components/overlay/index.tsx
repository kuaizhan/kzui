import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import ScrollContainer from '../scroll-container';
import EventBlackHole from '../event-black-hole'
import { DimensionType } from '../../../types/base';
import './style.less';

interface OverlayProps {
  hide: boolean,
  dimensions?: DimensionType
  onClick?: () => void
}

class Overlay extends KZUIComponent<OverlayProps> {
    static defaultProps = {
        ...baseDefaultProps,
        hide: false,
        className: '',
        style: {},
        dimensions: {},
        onClick: () => {}
    }

    render() {
        const clsPrefix = 'kui-overlay';
        const { className, hide, dimensions, style, children, onClick } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-hide`]: hide,
        }, className);
        const overlayStyle = {
            ...dimensions,
            ...style,
        };

        function handleClick() {
            onClick?.()
        }

        return (
            <ScrollContainer
                className={cls}
                style={overlayStyle}
                onClick={handleClick}
            >
                <EventBlackHole captureEvents={['click']}>
                    {children}
                </EventBlackHole>
            </ScrollContainer>
        );
    }
}

export default Overlay;
