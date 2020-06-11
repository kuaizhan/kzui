import * as React from 'react';
import classNames from 'classnames';
import '@kzui/font';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import { IconTypes } from '../../../types/base/icon-types';

import './style.less';

interface IconProps {
  iconClass?: string,
  onClick?: (e: React.MouseEvent) => void,
  type?: IconTypes,
  title?: string,
}

class Icon extends KZUIComponent<IconProps> {
    static defaultProps = {
      ...baseDefaultProps,
      iconClass: '',
      onClick: null,
      type: '',
      title: undefined
    }

    render() {
        const clsPrefix = 'kui-icon';
        const { iconClass, className, style, type, title } = this.props;
        // eslint-disable-next-line no-underscore-dangle
        const _iconClass = type ? `kz-e-${type}` : iconClass;
        const cls = classNames(clsPrefix, _iconClass, className);
        return (
            <span
                className={cls}
                onClick={this.props.onClick}
                role="button"
                tabIndex={0}
                style={style}
                title={title}
            />
        );
    }
}

export default Icon;
