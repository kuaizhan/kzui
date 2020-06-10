import * as React from 'react';
import { upperFirst } from '../../utils';

const eventHandler = (e: Event) => {
    e.stopPropagation();
};

interface EventBlackHoleProps {
  captureEvents?: string[] // TODO 可以更加准确
  className?: string,
  children: React.ReactNode
}

const EventBlackHole:React.FC<EventBlackHoleProps> = ({
  captureEvents = [],
  className = '',
  children = null 
}) => {
    const props = {
        className,
    };

    captureEvents.forEach((name) => {
        props[`on${upperFirst(name)}`] = eventHandler;
    });

    return React.createElement('div', props, children);
};

export default EventBlackHole;
