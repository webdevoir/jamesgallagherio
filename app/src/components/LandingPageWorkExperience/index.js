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

function LandingPageWorkExperience() {
  return (
    <Section
      id="work_experience-section"
      full="horizontal"
      className="work_experience"
      align="center"
      justify="center"
    >
      <br />
      <Heading align="center" tag="h2" className="heading">
        Work & Education Experience
      </Heading>
      <Box className={styles.main_text}>
        <Paragraph>
          Despite only being 15 years old, I have extensive experience in programming and developed a set of key interpersonal skills, including communication and leadership.
        </Paragraph>
      </Box>
      <Divider />
        <Accordion>
          <AccordionPanel heading='React Web Developer - Freelance'>
            <Paragraph>
            <Markdown content={`
During this position, I utilized the most advanced web technologies available to develop high-powered web applications designed to be adaptable, and scalable. In this position, I practice:
- Using a front-end stack that consists of React, Babel, and Grommet, an enterprise-grade React library.
- Using a back-end stack that consists of Ruby (on Rails) and GraphQL as an API query language.
- Constructing applications based on testability, and scalability by using strict web standards including the AirBnB Style Guide. These applications include a Code-Review-as-a-Service application, Accelerator Network API, as well as the Udacity Alumni Client.
- Building dozens of scalable API micro-services using Ruby on Rails and GraphQL to act as the back-end for React-based web applications.

This position also allowed me to develop my communication and teamwork skills, as well as improve my leadership skills in collaborative projects.`} />
            </Paragraph>
          </AccordionPanel>
          <AccordionPanel heading='Udacity Mentor and Reviewer'>
            <Paragraph>
            <Markdown content={`
Throughout this position, my main goal was to maximize student success by acting as a personal mentor to dozens of students. I was a mentor and reviewer for both the React Nanodegree, and the Full Stack Web Developer Nanodegree. The main skills practiced in this position were:

- Contribute effectively to the reviewer community and student communities by sharing best practices, facilitating constructive discussions, and ensuring the community is a great place to work and collaborate.
- Helping eager students to learn React JavaScript as a mentor and code reviewer for the Udacity React Nanodegree.
- Providing students with expert feedback by performing comprehensive code reviews on student projects.
- Educating students on best practices in React, design patterns, and code style through one-on-one classroom mentorship sessions.
- Developing communication skills and intrapersonal skills through facilitating with students, Udacity staff, and fellow mentors.

In this position I also led Dev-Ops and API development in the Udacity Alumni API app - https://medium.com/udacity/introducing-the-udacity-alumni-web-team-f69e7609a0aa#.y7v5j8e5x and here: https://github.com/udacityalumni`} />
            </Paragraph>
          </AccordionPanel>
            <AccordionPanel heading='High School'>
              <Paragraph>
              <Markdown content={`
During my four years to date at high school, I have made the following accomplishments:
- Gained National 5 Qualifications in English, Mathematics, Modern Studies, Business Management, History and Chemistry. Languages for Life and Work Qualification in French.
- Awarded for distinction in Business Management and English
- Founded the Digital Leaders Group (iPad program rollout and website management)
- Participant in student outreach and school feedback programs`} />
              </Paragraph>
            </AccordionPanel>
            <AccordionPanel heading='Udacity Full-Stack Web Developer Nanodegree'>
              <Paragraph>
              <Markdown content={`
The Full Stack Web Developer Nanodegree taught me cutting-edge skills and industry best practices for creating and developing high-quality web applications. The key skills practiced throughout this course include:

- HTML, CSS and JS
- Python Flask and Git
- Linux Server Administration, Authentication and Security, RESTful APIs, and API architecting
- Relational Databases, PostgreSQL

The skills acquired during this Nanodegree were reinforced in four portfolio projects and in several additional apps I have developed over the past few years. All projects were reviewed by an expert code reviewer to ensure the highest code quality and design was implemented across all projects.`} />
              </Paragraph>
            </AccordionPanel>
          </Accordion>
            <br />
    </Section>
  );
}


export default LandingPageWorkExperience;
