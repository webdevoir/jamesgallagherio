import React from 'react';
import Section from 'grommet-udacity/components/Section';
import Box from 'grommet-udacity/components/Box';
import Columns from 'grommet-udacity/components/Columns';
import Markdown from 'grommet-udacity/components/Markdown';
import Heading from 'grommet-udacity/components/Heading';
import Label from 'grommet-udacity/components/Label';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Headline from 'grommet/components/Headline';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Card from 'grommet-udacity/components/Card';
import Meter from 'grommet-udacity/components/Meter';
import Value from 'grommet-udacity/components/Value';
import Button from 'grommet-udacity/components/Button';
import styles from './index.module.scss';
import { FullSection, MainContent, MainBox } from './styles';
import cssModules from 'react-css-modules';
import { Divider, LoadingIndicator } from 'components';
import regeneratorRuntime from "regenerator-runtime";

function LandingPageHero() {
  return (
    <Hero background={<Image src='https://github.com/RyanCCollins/cdn/blob/master/misc/pattern-2.png?raw=true'
      fit='cover'
      full={true} />}
      size="large"
      backgroundColorIndex='dark'>
      <Box direction='row'
        justify='center'
        align='center'>
        <Box
          align='center'
          pad='medium'>
          <Heading margin='small'>
            James Gallagher
          </Heading>
          <Heading tag="h2" margin='xsmall'>
            React Web Developer
          </Heading>
          <Button
          label='Reach Out'
          href='/contact' />
        </Box>
      </Box>
    </Hero>
  );
}


export default LandingPageHero;
