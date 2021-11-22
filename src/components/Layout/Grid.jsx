import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  gap: ${(props) => (props.gapDefault ? props.gapDefault : '2rem')};
  margin: ${(props) => (props.marginDefault ? props.marginDefault : 0)};
  grid-template-rows: max-content;

  // @media ${(props) => props.theme.breakpoints.m} {
  //   grid-template-columns: 2rem repeat(6, 1fr) 2rem;
  //   gap: ${(props) => (props.gapMedium ? props.gapMedium : '1rem')};
  //   margin: ${(props) => (props.marginMedium ? props.marginMedium : 0)};
  // }
  //
  // @media ${(props) => props.theme.breakpoints.s} {
  //   grid-template-columns: 1rem repeat(6, 1fr) 1rem;
  //   gap: ${(props) => (props.gapSmall ? props.gapSmall : '1rem')};
  //   margin: ${(props) => (props.marginSmall ? props.marginSmall : 0)};
  // }
`;

export default Grid;
