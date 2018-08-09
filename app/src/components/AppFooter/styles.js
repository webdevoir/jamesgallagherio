import styled from 'styled-components';
import Section from 'udacity/components/Section';
import Footer from 'udacity/components/Footer';
import Button from 'grommet/components/Button';

export const StyledFooter = styled(Footer)`
  padding-top: 60px;
  title {
    color: black !important;
  }
`;

export const StyledSection = styled(Section)`
  flex: 1;
`;

export const ButtonWithSeperator = styled(Button)`
  &:after {
    content: '|';
    padding: 0 .5em;
    font-size: 1.5rem;
    font-weight: 300;
    color: #666;
  }
`;
