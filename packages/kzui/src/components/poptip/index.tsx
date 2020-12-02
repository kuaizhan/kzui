import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DimensionType } from '../../../types/base';
import Portal from '../portal';
import './style.less';

interface PopTipProps {
  dimensions?: DimensionType,
  isPopover?: boolean
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

const PopTip:React.FC<PopTipProps> = ({
    children = null,
    className = '',
    style = {},
    isPopover = false,
    trigger = 'hover',
    placement = 'bottom',
    theme = 'dark',
    onVisible = () => null,
    tipStyle = {},
    visible,
    onVisibleChange,
    tipClassName = '',
    tip,
    destroyOnHide = false,
    onTriggerClick,
    onTriggerHover,
    onBlur,
}) =>  {
    const [popVisible, setPopVisible] = useState(visible || false)
    const [tipPosition, setTipPosition] = useState<React.CSSProperties>({})
    const [arrowPosition, setArrowPosition] = useState<React.CSSProperties>({})

    const popTipRef = useRef()
    const tipRef = useRef()
    const triggerRef = useRef()

    const setPopTipRef = el => popTipRef.current = el
    const setTipRef = el => tipRef.current = el
    const setTriggerRef = el => triggerRef.current = el

    const clsPrefix = 'kui-poptip'
    const isManualShow = typeof visible !== 'undefined'
    const cls = classNames(clsPrefix, className,
        `${clsPrefix}--${trigger}`);
    const triggerCls = classNames(`${clsPrefix}__trigger`)
    
    const tipWrapper = classNames(
        `${clsPrefix}__wrap`,
        tipClassName,
        {
        [`${clsPrefix}__wrap--visible`]: isManualShow ? visible : popVisible,
        [`${clsPrefix}__wrap-popover`]: isPopover,
        [`${clsPrefix}__wrap--${placement}`]: placement, 
        }
    )
    const tipCls = classNames(
        `${clsPrefix}__tip--${theme}`,
        `${clsPrefix}__tip`,
        `${clsPrefix}__tip--${placement}`
    )
    const arrowCls = classNames(
        `${clsPrefix}__arrow`,
        {[`${clsPrefix}__arrow--${placement}`]: !isPopover},
        `${clsPrefix}__arrow--${theme}`,
    )

    useEffect(() => {
        adjustTipPosition();
    }, [])

    useEffect(() => {
        adjustTipPosition();
        document.body.addEventListener('click', handleBlur, false);
        document.body.addEventListener('mouseout', handleMouseOut, false);
        window.addEventListener('resize', adjustTipPosition)

        return () => {
            document.body.removeEventListener('click', handleBlur, false);
            document.body.removeEventListener('mouseout', handleMouseOut, false);
            window.removeEventListener('resize', adjustTipPosition)
        }
    }, [visible, popVisible])

    function changeTipVisble(isShow) {
        if (typeof visible !== 'undefined') {
            onVisibleChange?.(isShow)
            return
        }
        setPopVisible(isShow)
    }

    function handleBlur(e) {
      if (trigger !== 'click') {
        return;
      }
      // @ts-ignore
      if (popTipRef.current?.contains(e.target) || tipRef.current?.contains(e.target)) {
        return;
      }
      changeTipVisble(false)
      onBlur?.(e)
    }

    function handleMouseOver(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        onTriggerHover?.(e)

        if (trigger !== 'hover') return;

        changeTipVisble(true)
    }

    function handleMouseOut(e) {
        if (trigger !== 'hover') return;

        // @ts-ignore
        if (popTipRef.current?.contains(e.target) || tipRef.current?.contains(e.target)) {
          return;
        }
        changeTipVisble(false)
        onBlur?.(e)
    }

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        onTriggerClick?.(e)

        if (trigger !== 'click') return;

        if (typeof visible !== 'undefined') {
          onVisibleChange?.(!visible)
          return
        }
        setPopVisible(popVisible => !popVisible)
        onVisible?.()
    }

    function getTriggerPosition() {
        // @ts-ignore
        const positions = triggerRef.current?.getBoundingClientRect() || {}
        return positions
    }

    function adjustTipPosition() {
        const triggerPosition = getTriggerPosition()
        let tipPosition: React.CSSProperties = {}
        const leftRelateToPage = triggerPosition.left + window.scrollX
        const topRelateToPage = triggerPosition.top + window.scrollY
        const arrowWidth = 5

        let arrowPos: React.CSSProperties = { position: 'relative'}

        switch (placement) {
            case 'left':
                tipPosition.left = leftRelateToPage - arrowWidth
                tipPosition.top = topRelateToPage + triggerPosition.height / 2
                break;
            case 'right':
                tipPosition.top = topRelateToPage + triggerPosition.height / 2
                tipPosition.left = leftRelateToPage + triggerPosition.width + arrowWidth
                break;
            case 'top':
                tipPosition.top = topRelateToPage - arrowWidth
                tipPosition.left = leftRelateToPage + triggerPosition.width / 2
                break;
            case 'bottom': 
                tipPosition.top = topRelateToPage + triggerPosition.height + arrowWidth
                tipPosition.left = leftRelateToPage + triggerPosition.width / 2
                break;
            case 'bottom-left':
                tipPosition.top = topRelateToPage + triggerPosition.height + arrowWidth
                tipPosition.left = leftRelateToPage
                arrowPos.left = (triggerPosition.width) / 2
                break;
            case 'bottom-right':
                tipPosition.top = topRelateToPage + triggerPosition.height + arrowWidth
                tipPosition.left = leftRelateToPage + triggerPosition.width
                arrowPos.left = (triggerPosition.width) / 2 * -1
                break;
            case 'right-top':
                tipPosition.top = topRelateToPage
                tipPosition.left = leftRelateToPage + triggerPosition.width + arrowWidth
                arrowPos.top = triggerPosition.height / 2
                break;
            case 'right-bottom': 
                tipPosition.top = topRelateToPage + triggerPosition.height
                tipPosition.left = leftRelateToPage + triggerPosition.width + arrowWidth
                break;
            case 'left-bottom':
                tipPosition.left = leftRelateToPage - arrowWidth
                tipPosition.top = topRelateToPage + triggerPosition.height
                break;
            case 'left-top': 
                tipPosition.left = leftRelateToPage - arrowWidth
                tipPosition.top = topRelateToPage
                arrowPos.top = triggerPosition.height / 2
                break;
            case 'top-left':
                tipPosition.top = topRelateToPage - arrowWidth
                tipPosition.left = leftRelateToPage
                arrowPos.left = (triggerPosition.width) / 2
                break;
            case 'top-right':
                tipPosition.top = topRelateToPage - arrowWidth
                tipPosition.left = leftRelateToPage + triggerPosition.width
                arrowPos.left = (triggerPosition.width) / 2 * -1
                break;
        }

        setTipPosition(tipPosition)
        setArrowPosition(arrowPos)
    }
        
    const container = document.querySelector('#root')

    return (
        <div
            className={cls}
            style={style}
            ref={setPopTipRef}
            tabIndex={0}
        >
            <div
                className={triggerCls}
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                ref={setTriggerRef}
            >
                {children}
            </div>
            {
                destroyOnHide ? (
                    (
                        (visible || popVisible) ? (
                            <Portal
                                container={container}
                            >
                                <div className={tipWrapper} style={{...tipPosition}} ref={setTipRef}>
                                    <div className={arrowCls}></div>
                                    <div className={tipCls} style={{...tipStyle}}>{tip}</div>
                                </div>
                            </Portal>
                        ) : null
                    )
                ) : (
                    <Portal
                        container={container}
                    >
                        <div className={tipWrapper} style={{...tipPosition}} ref={setTipRef}>
                            <div className={arrowCls} style={arrowPosition}></div>
                            <div className={tipCls} style={{...tipStyle}}>
                                <div className={`${clsPrefix}__tip-inner`}>
                                    {tip}
                                </div>
                            </div>
                        </div>
                    </Portal>
                )
            }
        </div>
    );
}

export default PopTip;
