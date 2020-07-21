# ColorPicker - 拾色器

- ColorPicker

```jsx
/**
 * title: 精简版
 * desc: 将 type 属性设为 simple，使用简单拾色器。可通过设置 hex 属性设置颜色初始值
 */
import React, { useState } from "react";
import { Button, ColorPicker } from "@kzui/core";

export default () => {
  const [isCPHide, setIsCPHide] = useState(true);
  const [pickedColor, setPickedColor] = useState("#000000");
  function handleColorChange(value) {
    setPickedColor(value);
  }
  return (
    <>
      <div style={{ display: "flex", marginBottom: "6px" }}>
        <div
          style={{
            width: "30px",
            height: "30px",
            background: pickedColor,
            borderRadius: "2px",
          }}
        ></div>
        <span style={{ marginLeft: "6px" }}>{pickedColor}</span>
      </div>
      <Button
        type="confirm"
        onClick={() => setIsCPHide((isCPHide) => !isCPHide)}
      >
        简单拾色器
      </Button>
      <ColorPicker
        style={{ zIndex: 999 }}
        hide={isCPHide}
        type="simple"
        hex={pickedColor}
        onConfirm={() => setIsCPHide(true)}
        onChange={handleColorChange}
        onBlur={() => setIsCPHide(true)}
        onCancel={oldHex => {
          handleColorChange(oldHex);
          setIsCPHide(true);
        }}
      />
    </>
  );
};
```

```jsx
/**
 * title: 完整版拾色器
 * desc: 将 type 属性设为 full，使用完整版拾色器。近期使用颜色需要手动存储于localStorage
*/
import React, { useState } from "react";
import { Button, ColorPicker } from "@kzui/core";

export default () => {
  const [isCPHide, setIsCPHide] = useState(true);
  const [pickedColor, setPickedColor] = useState("#000000");
  function handleColorChange(value) {
    setPickedColor(value);
  }
  return (
    <>
      <div style={{ display: "flex", marginBottom: "6px" }}>
        <div
          style={{
            width: "30px",
            height: "30px",
            background: pickedColor,
            borderRadius: "2px",
          }}
        ></div>
        <span style={{ marginLeft: "6px" }}>{pickedColor}</span>
      </div>
      <Button
        type="confirm"
        onClick={() => setIsCPHide((isCPHide) => !isCPHide)}
      >
        完整版拾色器
      </Button>
      <ColorPicker
        style={{ zIndex: 999 }}
        hide={isCPHide}
        type="full"
        hex={pickedColor}
        onConfirm={() => setIsCPHide(true)}
        onChange={handleColorChange}
        onBlur={() => setIsCPHide(true)}
        onCancel={oldHex => {
          handleColorChange(oldHex);
          setIsCPHide(true);
        }}
      />
    </>
  );
};
```

## 属性

| 属性名               | 类型   | 描述                        | 是否必须 | 默认值 | 字典 |
| -------------------- | ------ | --------------------------- | -------- | ------ | ---- |
| dimensions           | object | 坐标尺寸                    | 否       | -      | -    |
| hide                 | bool   | 是否隐藏                    | 否       | -      | -    |
| hex                  | string | 初始色值                    | 否       | ff0000 | -    |
| a                    | number | 初始透明度                  | 否       | 100    | -    |
| recommendColors      | array  | 推荐颜色                    | 否       | -      | -    |
| recommendThemeColors | array  | 推荐主题色                  | 否       | -      | -    |
| recentColors         | array  | 最近使用色                  | 否       | -      | -    |
| type                 | string | 拾色器类型（simple or full) | 否       | simple | -    |

## 事件

| 属性名    | 类型 | 描述     | 是否必须 | 默认值 | 参数说明                                                        |
| --------- | ---- | -------- | -------- | ------ | --------------------------------------------------------------- |
| onChange  | func | 颜色改变 | 否       | null   | 第一个参数为返回的 hex 形式的颜色，第二个参数为透明度（0~100）  |
| onBlur    | func | 失去焦点 | 否       | null   | 第一个参数为原生的 MouseEvent， 第二个参数为修改前的初始值(hex) |
| onConfirm | func | 确定按钮 | 否       | null   | 无参数，不传此回调不显示确认按钮                                |
| onCancel  | func | 取消按钮 | 否       | null   | 参数为修改前的初始值(hex)，不传回调不显示取消按钮               |
