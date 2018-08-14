import styled from 'styled-components';
import GrommetTableRow from 'grommet/components/TableRow';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Anchor';

export const SectionLast = styled.section`
  padding-bottom: 200px !important;
  background-color: #f5f5f5;
`;

export const NavigationItem = styled(Anchor)`
  display: block;
  font-size: 14px;
  padding: 12px;
  color: #607D8B !important;
  background: #FFF;
  transition: all .1s ease;
  border-left: 4px solid transparent;
  overflow: auto;
  border-left-color: ${(props) => props.active ? '#26C6DA' : '' };
  border-bottom: 1px solid #ECEFF1;
  max-width: 200px;
  @media screen and (max-width: 768px) {
    flex-grow: 1;
    max-width: 100%;
  }
`;

export const FullSection = styled(Section)`
  width: 100% !important;
  justify-content: space-around;
`;

export const MainContent = styled(Box)`
  position: relative;
  margin-bottom: 14px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(46,61,73,.2);
  border: 1px solid #dbe2e8;
  @media screen and (max-width: 768px) {
    max-width: 100vw;
    box-sizing: border-box;
  }
  padding: 60px 0;
  width: 75%;
`;

export const MainBox = styled(Box)`
  background-color: #fafbfc;
`;

export const AsideButtonContainer = styled(Box)`
  position: absolute;
  top: 10px;
  right: 10px;
  @media screen and (max-width: 1450px) {
    display: none !important;
  }
`;

const sizeMap = (size) => {
  switch(size) {
    case 'xsmall':
      return 50;
    case 'small':
      return 100;
    case 'medium':
      return 150;
    case 'large':
      return 200;
    case 'xlarge':
      return 300;
    default:
      return 100;
  }
};

export const Wrapper = styled(Box)`
  width: 200px;
`;

export const ThumbnailImage = styled(Image)`
  border: solid 4px #FFFFFF;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
  display: inline-block;
  line-height: 0;
  max-width: 100%;
  height: auto;
  transition: all 200ms ease-out;
`;
