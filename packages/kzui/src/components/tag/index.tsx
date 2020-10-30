import * as React from 'react';
import classNames from 'classnames';
import { baseDefaultProps } from '../base/component';
import Icon from '../icon';
import { KZUIComponent } from '../../../types/base';
import { useState } from 'react';
import './style.less';

type DefaultT = {
  value: string | number
  label: string
}

interface TagProps extends KZUIComponent {
  value?: string | number //tag id,
  label?: string //tag名称,
  active?: boolean //初始状态是否选中,
  multi?: boolean //是否为多选,
  disabled?: boolean //是否禁用,
  removeAble?: boolean //是否可以删除,
  showOnly?: boolean //是否为展示标签
  onChange?: (v: any) => void
  onRemove?: (v: any) => void
  control?: boolean
}

const Tag: React.FC<TagProps> = (props) => {
  const [stateActive, setStateActive] = useState(props.active)
  const [preActive, setStatePreActive] = useState(props.active)

  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  if (preActive !== props.active && props.control) {
    setStateActive(props.active)
    setStatePreActive(props.active)
  }

  const clsPrefix = 'kui-tag';
  const { className, style, multi, disabled, showOnly, removeAble, label } = props;
  const cls = classNames(clsPrefix, {
    [`${clsPrefix}-active`]: stateActive,
    [`${clsPrefix}-multi`]: multi,
    [`${clsPrefix}-disabled`]: disabled,
    [`${clsPrefix}-showOnly`]: showOnly,
    [`${clsPrefix}-removeAble`]: removeAble,
  }, className);

  const handleClick = () => {
    if (!props.control) {
      setStateActive(!stateActive)
    }
    props.onChange?.({
      value: props.value,
      label: props.label,
    });
  }

  const handleRemove = (event) => {
    if (props.removeAble && props.onRemove) {
      props.onRemove({
        value: props.value,
        label: props.label,
      });
    }
    event.stopPropagation();
  };

  return (
    <span
      className={cls}
      style={style}
      onClick={handleClick}
    >
      {label}
      {multi && stateActive ?
        <Icon type="check" />
        : ''
      }
      {props.removeAble ?
        <Icon
          type="close"
          onClick={handleRemove}
        />
        : ''
      }
    </span>
  )
}


Tag.defaultProps = {
  ...baseDefaultProps,
  value: 0, // id
  label: 'Tag', // tag标签
  active: undefined, // 是否激活
  multi: false, // 多/单选
  disabled: false, // 是否禁用
  showOnly: false, // 是否为展示标签
  removeAble: false, // 是否可以删除
  onChange: null,
  onRemove: null,
  control: true
}

export default Tag;
