import * as React from "react";
import RM from 'react-markdown';
import './style.less';

const ReactMarkdown: React.FC<{source: string}> = ({
  source
}) => {
    return (
      <RM className="site-markdown" source={source} />
    )
}

export { ReactMarkdown }