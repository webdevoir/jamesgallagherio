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
import Footer from 'grommet-udacity/components/Footer';
import Button from 'grommet-udacity/components/Button';
import styles from './index.module.scss';
import { FullSection, MainContent, MainBox } from './styles';
import cssModules from 'react-css-modules';
import { Divider, LoadingIndicator } from 'components';
import regeneratorRuntime from "regenerator-runtime";

function LandingPageHero() {
  return (
    <Hero backgroundImage='https://github.com/jamesgallagher432/cdn/blob/master/brand/texture-5.jpg?raw=true'
      size="large"
      justify="center"
      backgroundColorIndex='dark'>
      <Box
        id="hero"
        align="center"
        justify="center"
        className={styles.heroBox}
      >
          <Heading margin='small'
          align="center">
            James Gallagher
          </Heading>
          <Heading tag="h2" margin='xsmall'
          align="center">
            React Web Developer
          </Heading>
          <Footer className={styles.footer}
          justify="center">
            <Button
            label='Reach Out'
            href='/contact'
            align="center"/>
          </Footer>
        </Box>
    </Hero>
  );
}


export default LandingPageHero;
