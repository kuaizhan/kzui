import { Component } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  container?: Element
}

class Portal extends Component<PortalProps> {
    container: Element;

    static defaultProps = {
        children: null,
        container: undefined
    }

    constructor(props) {
        super(props);
        if (!props.container) {
            this.container = document.createElement('div');
        }
    }

    componentDidMount() {
        if (!this.props.container) {
            document.body.appendChild(this.container);
        }
    }

    componentWillUnmount() {
        if (!this.props.container) {
            document.body.removeChild(this.container);
        }
    }

    render() {
        return createPortal(
            this.props.children,
            this.props.container || this.container,
        );
    }
}

export default Portal;
