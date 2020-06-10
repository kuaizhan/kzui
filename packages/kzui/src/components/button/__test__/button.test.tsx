import React from 'react';
import Button from '../index';
import { cleanup, render } from '@testing-library/react';

afterEach(cleanup);

test('Button right', () => {
    const { queryByText } = render(
        <Button type="confirm">确认按钮</Button>,
    );

    expect(queryByText('确认按钮')).toBeTruthy();
});

test('Button wrong', () => {
    const { queryByText } = render(
        <Button type="confirm">确认按钮</Button>,
    );

    expect(queryByText('确认按钮wrong')).toBeNull();
});
