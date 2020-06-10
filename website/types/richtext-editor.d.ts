import * as React from 'react'
import { KZUIComponent } from './base/index'

interface RichTextEditorProps extends KZUIComponent {
  name?: string //组件名,
  value?: string //初始化插入编辑框的html字符串,
  afterInit?: (command:string, value?:any) => void //执行组件内部方法的回调函数
  onChange?: ({name, value}:{name:string, value:string}) => void  //编辑框change事件
  onKeyPress?: (e:React.KeyboardEvent) => void //编辑框keyPress事件
  onPaste?: (e:any) => void // 编辑框paste事件
}

export declare class RichTextEditor extends React.Component<RichTextEditorProps> {}
