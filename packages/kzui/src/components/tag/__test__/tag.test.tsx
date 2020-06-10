import React, { useState } from 'react';
import Tag from '../index';
import { cleanup, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup);

test('tag label check', () => {
    const { queryByText } = render(
        <Tag label='label' value='value'></Tag>,
    );

    expect(queryByText('label')).toBeTruthy();
});


test('tag active check', () => {
    const { container } = render(
        <Tag label='label' value='value' active></Tag>,
    );

    expect(container.firstChild).toHaveClass('kui-tag-active');
});

test('tag multi check', () => {
    const { container } = render(
        <Tag label='label' active value='value' multi></Tag>,
    );

    expect(container.firstChild).toHaveClass('kui-tag-active');
    expect(container.firstChild).toHaveClass('kui-tag-multi');
});

test('tag uncontrol check', () => {
    const { container } = render(
        <Tag control={false}></Tag>,
    );

    // @ts-ignore
    expect(container.firstChild.classList.contains('kui-tag-active')).toBeFalsy()

    fireEvent(
        container.firstChild,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        })
    )

    expect(container.firstChild).toHaveClass('kui-tag-active');
});

test('tag control no change', () => {
    const { container } = render(
        <Tag active={false}></Tag>,
    );

    fireEvent(
        container.firstChild,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        })
    )

    // @ts-ignore
    expect(container.firstChild.classList.contains('kui-tag-active')).toBeFalsy()
});

test('tag control change', () => {

    const Test = () => {
        const [state, setstate] = useState(false)
        return (
            <Tag active={state} onChange={() => setstate(!state)}></Tag>
        )
    }

    const { container } = render(
        <Test />,
    );

    fireEvent(
        container.firstChild,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        })
    )

    // @ts-ignore
    expect(container.firstChild.classList.contains('kui-tag-active')).toBeTruthy()
});