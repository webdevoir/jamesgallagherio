// @flow
import React from 'react';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import { Divider } from 'components';
import error from './utils/error';

export default function WelcomeModal(props: {
  onClose: Function,
  nameInput: {
    error: ?string,
    value: ?string,
  },
  isVisible: boolean,
  onSubmit: Function,
}) {
  const { onClose, nameInput, isVisible, onSubmit } = props;
  return (
    <Layer
      align="center"
      closer
      hidden={!isVisible}
      onClose={onClose}
    >
      <Box align="center" justify="center" pad="large">
        <Heading align="center">
          What should we call you?
        </Heading>
        <Divider />
        <Form>
          <FormFields>
            <FormField
              help="What should we call you?"
              error={error(nameInput)}
              label="Enter your name"
              htmlFor="nameInput"
            >
              <input
                {...nameInput}
                required
                autoFocus
                placeholder="Ryan Collins"
                id="nameInput"
                autoComplete="on"
                name="name"
                type="text"
                aria-invalid={nameInput.error}
                aria-required
                className="input"
              />
            </FormField>
          </FormFields>
        </Form>
        <Footer align="center" justify="center" pad="large">
          <Button primary label="Submit" onClick={onSubmit} />
        </Footer>
      </Box>
    </Layer>
  );
}
