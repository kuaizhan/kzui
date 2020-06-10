# ImageCropper - 图片裁剪组件


* ImageCropper

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
imgsrc | string | 图片url | 是 | - | - |
initWidth | number | 组件宽度 | 否 | 232 | - |
scale | bool | 是否压缩裁剪（将图片缩放裁剪至裁剪框大小,图片会压缩） | 否 | false | - |
handleCrop(data) | func | 确定裁剪,接受裁剪后的图片url(data)作为参数 | 否 | ()=>{} | - |
handleCancel | func | 取消裁剪 | 否 | ()=>{} | - ||
