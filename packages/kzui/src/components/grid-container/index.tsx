import * as React from 'react';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import './style.less';

interface GridContainerProps {
  span: string | number,
  last?: boolean
}

class GridContainer extends KZUIComponent<GridContainerProps> {
    static defaultProps = {
      ...baseDefaultProps,
      span: 1,
      last: false,
      style: {},
    }

    render() {
        const classNames = this.classname('kui-grid-container', {
            [`span-${this.props.span}`]: true,
            last: this.props.last,
        }, true);
        return (
            <div style={this.props.style} className={classNames}>{this.props.children}</div>
        );
    }
}

export default GridContainer;
