import React, { Component } from 'react'
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

class LandingPageSummary extends Component {
  render() {
    const summary = "I am James Gallagher, a React Web Developer specializing in the implementation of powerful web technologies in order to deliver a user-orientated expereince. I have a proven track record of communication skills, problem solving skills, and fluency in React, Ruby on Rails, and React.<br>I am passionate about developing web applications and APIs that are designed for scalability, user friendliness, and adaptability.<br>I am working on a number of open-source and freelance projects and looking for a full-time position."
    return (
      <Section
        id="summary-section"
        full="horizontal"
        className="half-section gradient-green"
        align="center"
        justify="center"
      >
        <br />
        <Heading align="center" tag="h2" className="heading">
          About Me
        </Heading>
        <Divider />
        <Box align="center">
          <img
            alt="James Gallagher"
            src="https://github.com/jamesgallagher432/cdn/blob/master/brand/brand_image.png?raw=true"
            className={styles.avatar}
          />
          <Heading className="heading">
            James Gallagher
          </Heading>
          <Label uppercase className={styles.labelText}>
            React Web Developer
          </Label>
          <hr className={styles.seperator} />
        </Box>
        <Box align="center" justify="center" className={styles.innerContainer}>
          <Box className="main-text">
            <Markdown content={summary} className="paragraph" />
          </Box>
        </Box>
      </Section>
    );
  }
}


export default LandingPageSummary;
