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

function LandingPageLanguages() {
  return (
    <Section
      id="summary-section"
      align="center"
      justify="center"
      colorIndex="light-2"
      className="section"
    >
      <br />
      <Heading align="center" tag="h2" className="heading">
        Language Proficiency
      </Heading>
      <Divider />
      <Columns
        maxCount={3}
        align="center"
        justify="center"
      >
      <Card>
        <Box align="center" justify="center">
          <Meter
            type="arc"
            colorIndex="brand"
            value={90}/>
          <Box align="center" direction="column">
            <Value value="90%" size="medium" />
            <Heading align="center" tag="h2" strong>
              Ruby on Rails
            </Heading>
          </Box>
        </Box>
      </Card>
      <Card>
        <Box align="center" justify="center">
          <Meter
            type="arc"
            colorIndex="brand"
            value={90}
            label={
              <Box align="center" direction="column">
                <Value value="90%" size="medium" />
                <Heading align="center" tag="h2" strong>
                  JavaScript
                </Heading>
              </Box>
            }
          />
        </Box>
      </Card>
      <Card>
        <Box align="center" justify="center">
          <Meter
            type="arc"
            colorIndex="brand"
            value={85}
            label={
              <Box align="center" direction="column">
                <Value value="85%" size="medium" />
                <Heading align="center" tag="h2" strong>
                  GraphQL
                </Heading>
              </Box>
            }
          />
        </Box>
      </Card>
      <Card>
        <Box align="center" justify="center">
          <Meter
            type="arc"
            colorIndex="brand"
            value={80}
            label={
              <Box align="center" direction="column">
                <Value value="80%" size="medium" />
                <Heading align="center" tag="h2" strong>
                  Cloud
                </Heading>
              </Box>
            }
          />
        </Box>
      </Card>
      <Card>
        <Box align="center" justify="center">
          <Meter
            type="arc"
            colorIndex="brand"
            value={75}
            label={
              <Box align="center" direction="column">
                <Value value="75%" size="medium" />
                <Heading align="center" tag="h2" strong>
                  Python
                </Heading>
              </Box>
            }
          />
        </Box>
      </Card>
      </Columns>
    </Section>
  );
}


export default LandingPageLanguages;
