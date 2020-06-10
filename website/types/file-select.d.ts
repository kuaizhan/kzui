import * as React from 'react'
import { KZUIComponent } from './base/index'

interface FileSelectProps extends KZUIComponent {
    disabled?: boolean //是否禁用,
    last?: boolean //是否是最后一个按钮,
    accept?: string //文件类型MIME,
    multiple?: boolean //是否支持多选,
    maxFileSize?: number //单个文件最大尺寸，以字节计,
    maxFileCount?: number //可选取的文件数目
    buttonText?: string
    onChange?: (files: any[]) => void // TODO
    fileList?: any[] // TODO
}

export declare class FileSelect extends React.Component<FileSelectProps> {}
