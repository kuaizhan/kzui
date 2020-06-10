import * as React from 'react';
import KZUIComponent from '../base/component';
import './style.less';

interface RichTextEditorProps {
  name?: string //组件名,
  value?: string //初始化插入编辑框的html字符串,
  afterInit?: (
    command:(
      name: 'INSERT_HTML' | 'GET_HTML' | 'CLEAR_HTML',
      args: any
    ) => void,
    value?:any
  ) => void //执行组件内部方法的回调函数
  onChange?: ({name, value}:{name:string, value:string}) => void  //编辑框change事件
  onKeyPress?: (e:React.KeyboardEvent) => void //编辑框keyPress事件
  onPaste?: (e:any) => void // 编辑框paste事件
}

const getCurrentRange = () => {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
    }
};

const initRange = (dom) => {
    const range = document.createRange();
    const endOffset = dom.childNodes.length;
    range.setStart(dom, endOffset);
    range.setEnd(dom, endOffset);
    return range;
};

const focusRange = (range) => {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
};

const insetHTML = (selectRange, htmlStr) => {
    // string to frag
    const temp = document.createElement('template');
    temp.innerHTML = htmlStr;
    const frag = temp.content;
    // dom
    selectRange.deleteContents();
    selectRange.insertNode(frag);
    // set selectRange
    selectRange.collapse();
    focusRange(selectRange);
};

class RichTextEditor extends KZUIComponent<RichTextEditorProps> {
    wrp: Element;
    selectedRange: Range;
    lastHtml: Element | string;
    commander: (
      name: 'INSERT_HTML' | 'GET_HTML' | 'CLEAR_HTML',
      args: any
    ) => void;
    constructor(props) {
        super(props);
        this.autoBind('handleBlur', 'commander', 'handleChange', 'handleKeyPress', 'handlePaste');
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value;
    }

    componentDidMount() {
        const wrp = this.wrp;
        // init range
        this.selectedRange = initRange(wrp);
        const { afterInit } = this.props;

        this.commander = (name, args) => {
            let selectRange;
            const currentRange = getCurrentRange();
            if (currentRange && wrp.contains(currentRange.commonAncestorContainer)) {
                selectRange = currentRange;
            } else {
                selectRange = this.selectedRange;
            }
            switch (name) {
            case 'INSERT_HTML': {
                // 在这里操作DOM
                const { html } = args;
                insetHTML(selectRange, html);
                // 触发change事件
                this.handleChange();
                break;
            }

            case 'GET_HTML': {
                if (typeof args !== 'function') return;
                args(wrp.innerHTML);
                break;
            }

            case 'CLEAR_HTML': {
                wrp.innerHTML = '';
                // 触发change事件
                this.handleChange();
                break;
            }
            default:
            }
        };
        afterInit(this.commander);
    }

    handleBlur() {
        // 保存光标位置信息
        this.selectedRange = getCurrentRange();
    }
    handleKeyPress(e) {
        if (e.charCode === 13) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.charCode === 13) {
            insetHTML(getCurrentRange(), '<br>');

            // 触发onChange事件
            this.handleChange();
        }
        this.props.onKeyPress(e);
    }
    handleChange() {
        const wrp = this.wrp;
        const { name } = this.props;
        const html = wrp.innerHTML;
        if (html !== this.lastHtml) {
            this.props.onChange({
                name,
                value: html,
            });
        }
        this.lastHtml = html;
    }
    handlePaste(e) {
        this.props.onPaste(e);
    }

    render() {
        const className = this.classname('richtext-editor', {});

        return (
            <div
                className={className}
                ref={this.storeRef('wrp')}
                contentEditable
                dangerouslySetInnerHTML={{ __html: this.props.value }}
                onBlur={this.handleBlur}
                onInput={this.handleChange}
                onPaste={this.handlePaste}
                onKeyPress={this.handleKeyPress}
            />
        );
    }
}

const emptyFunc = () => {};

// RichTextEditor.defaultProps = {
//     name: '',
//     value: '',
//     afterInit: emptyFunc,
//     onChange: emptyFunc,
//     onKeyPress: emptyFunc,
//     onPaste: emptyFunc,
// };

// RichTextEditor.propTypes = {
//     name: PropTypes.string,
//     value: PropTypes.string,
//     afterInit: PropTypes.func,
//     onChange: PropTypes.func,
//     onKeyPress: PropTypes.func,
//     onPaste: PropTypes.func,
// };

export default RichTextEditor;
