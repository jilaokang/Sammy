import * as React from "react";

import 'wired-elements';

const WIRED_ELEMENT_LIST = [
    'wired-button',
    'wired-card',
    'wired-checkbox',
    'wired-combo',
    'wired-icon-button',
    'wired-input',
    'wired-item',
    'wired-listbox',
    'wired-progress',
    'wired-radio',
    'wired-radio-group',
    'wired-slider',
    'wired-textarea',
    'wired-toggle',
    'wired-tooltip'
];
const DEFAULT_RENDER_TYPE = 'div';

const wiredComponentCreator = (element: string) => (props) => React.createElement(WIRED_ELEMENT_LIST.indexOf(element) >= 0 ? element : DEFAULT_RENDER_TYPE, props, props.children);

export const WiredCard = wiredComponentCreator('wired-card');

export const WiredCombo = wiredComponentCreator('wired-combo');

export const WiredItem = wiredComponentCreator('wired-item');

export const WiredIconButton = wiredComponentCreator('wired-icon-button');

export const WiredButton = wiredComponentCreator('wired-button');

export const WiredListBox = wiredComponentCreator('wired-listbox');
