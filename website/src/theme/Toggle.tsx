/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OriginalToggle from '@theme-original/Toggle';
import type {Props} from '@theme/Toggle';
import {
  lightStorage,
  darkStorage,
  type ColorState,
  updateDOMColors,
} from '@site/src/utils/colorUtils';

// The ColorGenerator modifies the DOM styles. The styles are persisted in
// session storage, and we need to apply the same style when toggling modes even
// when we are not on the styling-layout page. The only way to do this so far is
// by hooking into the Toggle component.
export default function Toggle(props: Props): JSX.Element {
  return (
    <OriginalToggle
      {...props}
      onChange={(e) => {
        props.onChange(e);
        const isDarkMode = e.target.checked;
        const storage = isDarkMode ? darkStorage : lightStorage;
        const colorState = JSON.parse(
          storage.get() ?? 'null',
        ) as ColorState | null;
        if (colorState) {
          updateDOMColors(colorState);
        }
      }}
    />
  );
}
