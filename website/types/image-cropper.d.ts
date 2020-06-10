import * as React from 'react'
import { KZUIComponent } from './base/index'

interface ImageCropperProps extends KZUIComponent {
    imgsrc: string //图片url,
    initWidth?: number //组件宽度,
    scale?: boolean //是否压缩裁剪（将图片缩放裁剪至裁剪框大小,图片会压缩）,
    handleCrop?: (data: string) => void //确定裁剪,接受裁剪后的图片url(data)作为参数,
    handleCancel?: () => void //取消裁剪
}

export declare class ImageCropper extends React.Component<ImageCropperProps> {}
