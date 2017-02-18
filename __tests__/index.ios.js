import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Index from '../index.ios';
// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(
    <Index />,
  );
});
