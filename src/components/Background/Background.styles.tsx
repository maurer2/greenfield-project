import styled from 'styled-components';
import {ReactComponent as FieldLines} from './lines.svg';


export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: green;
  color: white;
`;

export const Content = styled.div`
  position: absolute;
  margin: auto;
  padding: 1rem;
  height: min-content;
  width: min-content;
  inset: 0;
  background: white;
  color: green;
`;

export const Image = styled(FieldLines).attrs({
  'preserveAspectRatio': 'xMidYMid meet',
})`
  display: block;
  height: 100%;
  width: 100%;
`
