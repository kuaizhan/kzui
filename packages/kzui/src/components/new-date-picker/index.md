# 新日期组件开发

```jsx
import React, { useState } from 'react';
import DatePicker from './index.tsx';

export default () => {
  
  return (
    <DatePicker />
  )
}
```

```jsx
import React, { useState } from 'react';
import { DateRangeInput } from './date-range-input/index.tsx';

export default () => {
  
  const [value, setValue] = useState({
    start: '',
    end:'',
  })

  return (
    <DateRangeInput
      value={value}
      onChange={e => setValue(e)}
    />
  )
}
```