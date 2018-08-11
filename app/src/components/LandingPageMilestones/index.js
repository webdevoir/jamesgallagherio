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

function LandingPageMilestones() {
  return (
    <Section
      id="milestones-section"
      full="horizontal"
      pad="large"
      className={styles.milestones}
    >
      <Headline
        align="center"
      >
        Milestones
      </Headline>
      <Divider inverted />
      <Box full="horizontal" align="center" justify="center">
        <Tiles align="center" justify="center">
          <Tile>
            <Box pad="medium">
              <Value value={`100+`} size="medium" />
              React Components and Containers
            </Box>
          </Tile>
          <Tile>
            <Box pad="medium">
              <Value value={20} size="medium" />
              Finished REST APIs
            </Box>
          </Tile>
          <Tile>
            <Box pad="medium">
              <Value value={140} size="medium" />
              Students Mentored
            </Box>
          </Tile>
          <Tile>
            <Box pad="medium">
              <Value value={6} size="medium" />
              Years Refining Skills
            </Box>
          </Tile>
      </Tiles>
    </Box>
    <Box align="center" justify="center">
      <Box className={styles.main_text}>
        <Markdown content={`
Developed dozens of applications with React and cutting-edge JS libraries, focusing on state management, progressive web technologies, performance, and scalability. Designed and developed interfaces using a wide variety of libraries including Grommet and Semantic UI.<br>
Managed infrastructure in order to host web applications on a number of platforms, including Heroku, AWS, and DigitalOcean.<br>
Contributed to many open-source projects, allowing me to acquire additional community and collaboration skills. Designed and created many scalable API services using Ruby on Rails, GraphQL, and Node.js.
      `} className="paragraph" />
      </Box>
    </Box>
  </Section>
  );
}


export default LandingPageMilestones;
