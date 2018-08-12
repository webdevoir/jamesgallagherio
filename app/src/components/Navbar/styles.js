import styled from 'styled-components';
import Menu from 'grommet-udacity/components/Menu';

export const StyledMenu = styled(Menu)`
  flex-direction: row !important;
  flex-grow: 1 !important;
  align-items: center;
  justify-content: flex-end;
`;

export const StyledLogo = styled.img`
  max-height: 45px;
  margin-left: 6%;
`;

export const LogoPlaceholder = styled.div`
  width: 177px;
  height: 45px;
  background-color: transparent;
`;

export const Logo = styled.div`
  height: 40px;
  left: -77px;
  width: 77px !important;
  animation: ${props => props.animation};
  background-image:url('${props => props.url}');
  background-repeat:no-repeat;
  background-size:contain;
  background-position:center;
`;
