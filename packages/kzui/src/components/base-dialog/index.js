import React from 'react';
import PropTypes from 'prop-types';
import KZUIComponent from '../base/index';
import Overlay from '../overlay/index';
import './style.less';

class BaseDialog extends KZUIComponent {
    render() {
        const stateClass = {};
        if (this.props.position) {
            stateClass[this.props.position] = true;
        }
        // TODO
        const dialogCls = this.classname('base-dialog', {}, false, true);
        const containerCls = this.classname('base-dialog-container', stateClass, false, true);
        const propCls = this.classname('', {}, true);
        return (
            <Overlay
                modal={this.props.modal}
                hide={this.props.hide}
                className={dialogCls}
            >
                <div className={containerCls}>
                    <div className={propCls}>
                        {this.props.children}
                    </div>
                </div>
            </Overlay>
        );
    }
}

BaseDialog.defaultProps = {
    hide: false,
    modal: true,
};

BaseDialog.propTypes = {
    position: PropTypes.oneOf(['bottom', 'top']),
    hide: PropTypes.bool,
    modal: PropTypes.bool,
};

export default BaseDialog;
