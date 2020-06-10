# KUI2 Bug List

- ^v^ 已解决
- ~~xx~~ 废弃该条

1. pop-confirm 组件每次点击会变宽一些 ^v^
2. pop-tip 是无效的，popTip 需要完善，onBlur参数是无效的 ^v^
3. popDialog 和 popover 没什么区别，除了有无 onBlur 属性 ^v^
4. pager 点第5页时第2页会消失
5. date-picker 点击切换月份的箭头会报错
6. tag-selector 重构
7. 删除pop-dialog ^v^
8. PopConfirm 需要父组件变成relative 难 ^v^
9. Textarea add disabled
10. merge textarea into input
11. ~~删除 toptip 使用notification~~ ^v^
12. 使用形容词visible来替代动词hide 很多
13. 可以手动控制 tooltip 显示
14. 表单的API 应该统一设计成
  ```ts
  interface BaseFormItem<T, E> {
    value: T
    onChange: (value: T, e: E) => void
  }
  ```
15. Icon 这个组件 iconClass 改成 type, 不需要 kz-e-
16. 为了使项目更加内聚，代码、文档、示例、测试用例(will have)应该放到一个组件目录下面
17. select 组件有在dialog 下，超出dialog的部分会看不见, 设置z-index也没有用
  - antd 的做法是 dropdown 的节点是渲染到根节点， 通过计算来做的
18. dialog 的居中也写的不居中
19. 统一管理z-index, notification的要大于dialog