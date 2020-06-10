import * as React from 'react';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Button from '../button';
import './style.less';

const compare = (target, min, max) => {
    if (target < min) return min;
    else if (target > max) return max;
    return target;
};

interface ImageCropperProps {
  imgsrc: string //图片url,
  initWidth?: number //组件宽度,
  scale?: boolean //是否压缩裁剪（将图片缩放裁剪至裁剪框大小,图片会压缩）,
  handleCrop?: (data: string) => void //确定裁剪,接受裁剪后的图片url(data)作为参数,
  handleCancel?: () => void //取消裁剪
  size?: any,
  error?: boolean
  disabled?: boolean
}

class ImageCropper extends KZUIComponent<ImageCropperProps, {
  x: number,
  y: number,
  width: number,
  height: number,
  cropped: boolean
}> {
    direction?: 'all' | 'n' | 's' | 'w' | 'e' | 'ne' | 'nw' | 'se' | 'sw' | '';
    moveStartX: any;
    moveStartY: any;
    scaleRatio: number;
    imageW: number;
    imageH: number;
    canvas: any;

    static defaultProps = { 
      ...baseDefaultProps,
      initWidth: 232,
      scale: false,
      handleCrop: () => {},
      handleCancel: () => {},
    }
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            cropped: false,
        };
        this.autoBind('handleMouseDown', 'handleMouseUp', 'handleMouseMove', 'handleConfirm', 'handleImageLoad');
    }

    componentWillMount() {
        window.onmousemove = this.handleMouseMove;
        window.onmouseup = this.handleMouseUp;
    }

    handleMouseDown(e) {
        const direction = e.target.getAttribute('data-direction');
        this.direction = direction;
        this.moveStartX = e.screenX;
        this.moveStartY = e.screenY;
    }

    handleMouseMove(e) {
        let offsetX = e.screenX - this.moveStartX;
        let offsetY = e.screenY - this.moveStartY;
        this.moveStartX = e.screenX;
        this.moveStartY = e.screenY;
        const lastX = this.state.x;
        const lastY = this.state.y;
        const lastH = this.state.height;
        const lastW = this.state.width;
        const imageH = this.imageH;
        const imageW = this.imageW;
        const minOffset = 0;
        const minUnit = 10;

        switch (this.direction) {
        case 'all': {
            let nowX = lastX + offsetX;
            const maxX = imageW - lastW;
            nowX = compare(nowX, minOffset, maxX);

            let nowY = lastY + offsetY;
            const maxY = imageH - lastH;
            nowY = compare(nowY, minOffset, maxY);

            this.setState({ x: nowX, y: nowY });
            break;
        }

        case 'n': {
            const nowY = lastY + offsetY;
            const maxY = (lastY + lastH) - minUnit;
            offsetY = compare(nowY, minOffset, maxY) - lastY;

            const nowX = lastX + (offsetY / 2);
            if (nowX < minOffset) offsetY = (minOffset - lastX) * 2;

            const allW = (lastX + lastW) - (offsetY / 2);
            if (allW > imageW) offsetY = ((lastX + lastW) - imageW) * 2;

            this.setState({
                width: lastW - offsetY,
                height: lastH - offsetY,
                x: lastX + (offsetY / 2),
                y: lastY + offsetY,
            });
            break;
        }

        case 'w': {
            const nowX = lastX + offsetX;
            const maxX = (lastX + lastW) - minUnit;
            offsetX = compare(nowX, minOffset, maxX) - lastX;

            const nowY = lastY + (offsetX / 2);
            if (nowY < minOffset) offsetX = (minOffset - lastY) * 2;

            const allY = (lastY + lastH) - (offsetX / 2);
            if (allY > imageH) offsetX = ((lastY + lastH) - imageH) * 2;

            this.setState({
                width: lastW - offsetX,
                height: lastH - offsetX,
                x: lastX + offsetX,
                y: lastY + (offsetX / 2),
            });
            break;
        }

        case 's': {
            const nowH = lastH + offsetY;
            const maxH = imageH - lastY;
            offsetY = compare(nowH, minUnit, maxH) - lastH;

            const nowX = lastX - (offsetY / 2);
            if (nowX < minOffset) offsetY = (lastX - minOffset) * 2;

            const allW = lastW + lastX + (offsetY / 2);
            if (allW > imageW) offsetY = (imageW - lastX - lastW) * 2;

            this.setState({
                width: lastW + offsetY,
                height: lastH + offsetY,
                x: lastX - (offsetY / 2),
                y: lastY,
            });
            break;
        }

        case 'e': {
            const nowW = lastW + offsetX;
            const maxW = imageW - lastX;
            offsetX = compare(nowW, minUnit, maxW) - lastW;

            const nowY = lastY - (offsetX / 2);
            if (nowY < minOffset) offsetX = (lastY + minOffset) * 2;

            const allH = lastH + lastY + (offsetX / 2);
            if (allH > imageH) offsetX = (imageH - lastH - lastY) * 2;

            this.setState({
                width: lastW + offsetX,
                height: lastH + offsetX,
                x: lastX,
                y: lastY - (offsetX / 2),
            });
            break;
        }
        case 'nw': {
            const nowY = lastY + offsetY;
            const maxY = (lastY + lastH) - minUnit;
            offsetY = compare(nowY, minOffset, maxY) - lastY;

            const nowX = lastX + offsetY;
            const maxX = (lastX + lastW) - minUnit;
            offsetY = compare(nowX, minOffset, maxX) - lastX;

            this.setState({
                width: lastW - offsetY,
                height: lastH - offsetY,
                x: lastX + offsetY,
                y: lastY + offsetY,
            });
            break;
        }
        case 'ne': {
            const nowY = lastY + offsetY;
            const maxY = (lastY + lastH) - minUnit;
            offsetY = compare(nowY, minOffset, maxY) - lastY;

            const nowW = lastW - offsetY;
            const maxW = imageW - lastX;
            offsetY = lastW - compare(nowW, minUnit, maxW);

            this.setState({
                width: lastW - offsetY,
                height: lastH - offsetY,
                x: lastX,
                y: lastY + offsetY,
            });
            break;
        }
        case 'sw': {
            const nowX = lastX + offsetX;
            const maxX = (lastX + lastW) - minUnit;
            offsetX = compare(nowX, minOffset, maxX) - lastX;

            const nowH = lastH - offsetX;
            const maxH = imageH - lastY;
            offsetX = lastH - compare(nowH, minUnit, maxH);

            this.setState({
                width: lastW - offsetX,
                height: lastH - offsetX,
                x: lastX + offsetX,
                y: lastY,
            });
            break;
        }
        case 'se': {
            const nowW = lastW + offsetX;
            const maxW = imageW - lastX;
            offsetX = compare(nowW, minUnit, maxW) - lastW;

            const nowH = lastH + offsetX;
            const maxH = imageH - lastY;
            offsetX = compare(nowH, minUnit, maxH) - lastH;

            this.setState({
                width: lastW + offsetX,
                height: lastH + offsetX,
            });

            break;
        }
        default:
            break;
        }
    }

    handleMouseUp() {
        this.direction = '';
        this.moveStartX = 0;
        this.moveStartY = 0;
    }

    handleImageLoad({ target: img }) {
        const origW = img.naturalWidth;
        const origH = img.naturalHeight;
        const calcW = this.props.initWidth;
        const scaleRatio = calcW / origW;
        const calcH = origH * scaleRatio;

        const unit = calcW > calcH ? calcH : calcW;
        const offsetX = (calcW - unit) - parseInt(String((calcW - unit) / 2), 10);
        const offsetY = (calcH - unit) / 2;

        this.scaleRatio = scaleRatio;

        this.imageW = calcW;
        this.imageH = calcH;
        this.setState({
            width: unit,
            height: unit,
            x: offsetX,
            y: offsetY,
        });
    }

    handleConfirm() {
        const canvas = this.canvas;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.onload = () => {
            const x = this.state.x / this.scaleRatio;
            const y = this.state.y / this.scaleRatio;
            const width = this.state.width / this.scaleRatio;
            const height = this.state.height / this.scaleRatio;
            const canvasW = this.props.scale ? this.state.width : width;
            const canvasH = this.props.scale ? this.state.height : height;
            canvas.height = canvasH;
            canvas.width = canvasW;
            ctx.drawImage(image, x, y, width, height, 0, 0, canvasW, canvasH);
            this.setState({
                cropped: true,
            });
            this.props.handleCrop(canvas.toDataURL());
        };

        image.src = this.props.imgsrc;
    }

    render() {
        const className = this.classname('image-cropper', {
            [this.props.size]: true,
            error: this.props.error,
            disabled: this.props.disabled,
        });

        const width = this.props.initWidth;
        const height = this.props.initWidth;
        const display = this.state.cropped ? 'none' : 'block';
        const containerStyle = { display, width };
        const boxStyle = {
            width: this.state.width,
            height: this.state.height,
            top: this.state.y,
            left: this.state.x,
        };
        const transStyle = {
            top: -this.state.y,
            left: -this.state.x,
            width,
        };
        const canvasStyle = {
            display: this.state.cropped ? 'block' : 'none',
            width,
        };

        return (
            <div className={className}>
                <div
                    className="image-cropper-container"
                    onMouseDown={this.handleMouseDown}
                    style={containerStyle}
                >
                    <div className="image-background">
                        <img
                            src={this.props.imgsrc}
                            onLoad={this.handleImageLoad}
                            style={{ width }}
                            alt="cropper"
                        />
                    </div>
                    <div className="image-mask" />
                    <div className="image-crop-box" style={boxStyle}>
                        <div className="image-crop-view">
                            <img
                                src={this.props.imgsrc}
                                style={transStyle}
                                alt="cropper"
                            />
                        </div>
                        <div className="image-crop-move" data-direction="all" />
                        <div className="image-crop-line image-crop-line-n" data-direction="n" />
                        <div className="image-crop-line image-crop-line-e" data-direction="e" />
                        <div className="image-crop-line image-crop-line-s" data-direction="s" />
                        <div className="image-crop-line image-crop-line-w" data-direction="w" />
                        <div className="image-crop-point image-crop-point-n" data-direction="n" />
                        <div className="image-crop-point image-crop-point-ne" data-direction="ne" />
                        <div className="image-crop-point image-crop-point-e" data-direction="e" />
                        <div className="image-crop-point image-crop-point-se" data-direction="se" />
                        <div className="image-crop-point image-crop-point-s" data-direction="s" />
                        <div className="image-crop-point image-crop-point-sw" data-direction="sw" />
                        <div className="image-crop-point image-crop-point-w" data-direction="w" />
                        <div className="image-crop-point image-crop-point-nw" data-direction="nw" />
                    </div>
                </div>
                <div className="image-cropper-btns" style={{ display }}>
                    <Button onClick={this.props.handleCancel}>取消</Button>
                    <Button type="confirm" onClick={this.handleConfirm}>确定</Button>
                </div>
                <div className="image-cropper-canvas" style={canvasStyle} >
                    <canvas ref={(c) => { this.canvas = c; }} style={{ width, height }} />
                </div>
            </div>
        );
    }
}

// ImageCropper.propTypes = {
//     imgsrc: PropTypes.string.isRequired,
//     initWidth: PropTypes.number,
//     scale: PropTypes.bool,
//     handleCrop: PropTypes.func,
//     handleCancel: PropTypes.func,
// };

// ImageCropper.defaultProps = {
//     initWidth: 232,
//     scale: false,
//     handleCrop: () => {},
//     handleCancel: () => {},
// };

export default ImageCropper;
