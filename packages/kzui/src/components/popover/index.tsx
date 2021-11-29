import * as React from 'react';
import { DimensionType } from '../../../types/base';
import PopTip from '../poptip';

interface PopOverProps {
  dimensions?: DimensionType,
  tip: string | React.ReactNode // 提示内容
  trigger?: 'click' | 'hover'
  placement?: 'left' | 'right' | 'top' | 'bottom' | 'left-bottom' | 'left-top' | 'right-top' | 'right-bottom' | 'bottom-left' | 'bottom-right'| 'top-left' | 'top-right'
  theme?: 'light' | 'dark'
  tipStyle?: React.CSSProperties,
  onVisible?: () => void  // 内部控制显隐的显示后的回调
  visible?: boolean // 用于手动控制气泡显隐
  onVisibleChange?: (visible: boolean) => void // 用于手动控制气泡显隐
  className?: string
  style?: React.CSSProperties
  tipClassName?: string
  destroyOnHide?: boolean
  onTriggerClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void // 点击回调
  onTriggerHover?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void // hover 回调
  onBlur?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Popover:React.FC<PopOverProps> = ({
    children = null,
    className = '',
    style = {},
    placement = 'bottom',
    tipStyle = {},
    visible,
    onVisibleChange,
    tipClassName = '',
    tip,
    destroyOnHide = false,
    onTriggerClick,
    onBlur,
}) =>  {
    

    return (
        <PopTip
            theme="light"
            trigger="click"
            style={style}
            placement={placement}
            visible={visible}
            className={className}
            onVisibleChange={onVisibleChange}
            tip={tip}
            tipStyle={tipStyle}
            tipClassName={tipClassName}
            destroyOnHide={destroyOnHide}
            onTriggerClick={onTriggerClick}
            onBlur={onBlur}
        >
            {children}
        </PopTip>
    );
}

export default Popover;
