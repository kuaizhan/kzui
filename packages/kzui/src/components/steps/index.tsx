import * as React from 'react';
 import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import './style.less';
import { UiSizeType } from '../../../types/base';

interface StepProps {
  size?: UiSizeType
  curStep?: number
  stepTitles?: Array<string>
  children?: Array<React.ReactNode>
}

interface StepContentProps {
  className: string,
  cur: boolean,
  children: React.ReactNode,
  style: React.CSSProperties,
}

interface StepItemProps {
  className: string,
  cur: boolean,
  style: React.CSSProperties,
  children: React.ReactNode,
  index: number,
  passed: boolean
}

const clsPrefix = 'kui-step-nav';

const StepContent: React.FC<Partial<StepContentProps>> = (
    props = {
        className: '',
        cur: false,
        children: null,
        style: {},
    }
) => {
    const { className, style, cur, children } = props;
    const cls = classNames(`${clsPrefix}-step-content`, {
        [`${clsPrefix}-cur`]: cur,
    }, className);
    return (
        <div className={cls} style={style}>
            {children}
        </div>
    );
};

const StepItem: React.FC<Partial<StepItemProps>> = (
    props = {
        className: '',
        cur: false,
        children: null,
        index: 0,
        style: {},
        passed: false
    }
) => {
    const { className, style, cur, index, children, passed } = props;
    const cls = classNames(`${clsPrefix}-nav-item`, {
        [`${clsPrefix}-cur`]: cur,
        [`${clsPrefix}-item--passed` ]: passed
    }, className);

    return (
        <div className={cls} style={style}>
            <span className={`${clsPrefix}-icon`}>
                {index}
            </span>
            <span className={`${clsPrefix}-title`}>{children}</span>
        </div>
    );
};

class Steps extends KZUIComponent<StepProps> {
    
    static defaultProps = {
        ...baseDefaultProps,
        size: 'normal',
        curStep: 1,
    }

    render() {
        const { className, style, curStep, children, stepTitles } = this.props;
        const cls = classNames(clsPrefix, className);

        return (
            <div className={cls} style={style}>
                <div className={`${clsPrefix}-nav`}>
                    {stepTitles.map(
                        (text, index) => (
                            <React.Fragment>
                                <StepItem
                                    key={`step-nav-item${index}`}
                                    index={index + 1}
                                    cur={curStep === index + 1}
                                    passed={curStep > (index + 1)}
                                >
                                    {text}
                                </StepItem>
                                {
                                    index < (stepTitles.length - 1) ? (
                                        <div
                                            className={`${clsPrefix}-interline ${(curStep > (index + 1)) ? `${clsPrefix}-interline--passed` : ''}`}
                                        />
                                    ) : null
                                }
                            </React.Fragment>
                        ),
                    )}
                </div>
                {children.map(
                    (item, key) => (
                        <StepContent
                            key={`step-content-${key}`}
                            cur={this.props.curStep === key + 1}
                        >
                            {item}
                        </StepContent>
                    ),
                )}
            </div>
        );
    }
}

export default Steps;
