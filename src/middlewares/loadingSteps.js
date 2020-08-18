import styled from 'styled-components';
import { loading } from './animation';

const LoadingStep = styled.span`
  animation: ${loading} 1.4s infinite both;
  animation-delay: ${props => props.delay};
`;

export default LoadingStep;