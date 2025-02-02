import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoNativeConfigurationViewProps } from './ExpoNativeConfiguration.types';

const NativeView: React.ComponentType<ExpoNativeConfigurationViewProps> =
  requireNativeView('ExpoNativeConfiguration');

export default function ExpoNativeConfigurationView(props: ExpoNativeConfigurationViewProps) {
  return <NativeView {...props} />;
}
