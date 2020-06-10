/**
 * @description 文件选择组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent from '../base/index';
import Icon from '../icon/index';
import Button from '../button/index';
import ImageCard from './image-card';
import './style.less';

const getBase64 = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            resolve(e.target.result)
        }
    })
}

class FileSelect extends KZUIComponent {
    constructor(props) {
        super(props);
        this.autoBind(
            'handleChange',
            'handleClick',
            'handleDelete'
        );
    }

    handleClick() {
        if (!this.props.disabled) {
            this.fileInput.click();
        }
    }

    handleChange() {
        const files = this.fileInput.files;
        if (this.props.multiple && files.length > this.props.maxFileCount) {
            return this.raiseError(1, '超过文件选择上限');
        }

        let file;
        for (let i = 0; i < files.length; i += 1) {
            file = files[i];
            if (this.props.maxFileSize && file.size > this.props.maxFileSize) {
                return this.raiseError(2, '超过大小上限');
            }
        }

        const arrayFiles = Array.from(files);

        Promise
            .all(arrayFiles.map((file, index) => getBase64(file).then(url => arrayFiles[index].url = url)))
            .then(() => {
                if (this.props.onChange) {
                    this.props.onChange([...this.props.fileList, ...arrayFiles]);
                }
            })

    }

    handleDelete(index) {
        const newArrayFiles = [...this.props.fileList]
        newArrayFiles.splice(index, 1)
        this.props.onChange(newArrayFiles)
    }

    render() {
        const clsPrefix = 'kui-file-select';
        const { className, style, iconClass, buttonText, fileList } = this.props;
        const cls = classNames(clsPrefix, className);
        return (
            <div className={cls} style={style}>
                {fileList.map((file, index) => (
                    <ImageCard
                        className={`${clsPrefix}-upload`} url={file.url}
                        onDelete={() => this.handleDelete(index)}
                    />
                ))}
                <div onClick={this.handleClick} className={`${clsPrefix}-upload`}>
                    {this.props.children ? this.props.children : 
                        <Button
                            type="confirm"
                            last={this.props.last}
                        >
                            {
                                iconClass && (
                                    <Icon iconClass={iconClass} />
                                )
                            }
                            {buttonText}
                        </Button>
                    }
                </div>
                <input
                    className={`${clsPrefix}-input`}
                    ref={this.storeRef('fileInput')}
                    type="file"
                    accept={this.props.accept}
                    multiple={this.props.multiple}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

FileSelect.defaultProps = {
    iconClass: '',
    accept: '*/*',
    last: false,
    disabled: false,
    multiple: false,
    maxFileSize: 4194304, // 4MB
    maxFileCount: 1,
    onChange: null,
    onError: null,
    buttonText: undefined,
    fileList: []
};

FileSelect.propTypes = {
    iconClass: PropTypes.string,
    accept: PropTypes.string,
    last: PropTypes.bool,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    maxFileSize: PropTypes.number,
    maxFileCount: PropTypes.number,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    buttonText: PropTypes.string,
};

export default FileSelect;
