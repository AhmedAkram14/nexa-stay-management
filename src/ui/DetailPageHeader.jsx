import styled from "styled-components";

import ButtonText from "./ButtonText";

/** Back + title on one row on all breakpoints; avoids a full-width “dead” row on mobile. */
export const DetailPageHeader = styled.header`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  column-gap: 0.8rem;
  row-gap: 0.25rem;
  width: 100%;
  min-width: 0;
  margin-bottom: 1.6rem;

  @media (max-width: 640px) {
    column-gap: 0.6rem;
    margin-bottom: 1.2rem;
  }
`;

export const DetailBackLink = styled(ButtonText)`
  padding: 0.35rem 0.5rem 0.35rem 0;
  margin: 0.15rem 0 0 -0.45rem;
  font-size: 1.4rem;
  line-height: 1.35;
  border-radius: var(--border-radius-sm);
  white-space: nowrap;
  align-self: start;

  &:hover,
  &:active {
    background-color: var(--color-grey-100);
  }

  @media (max-width: 640px) {
    padding: 0.3rem 0.4rem 0.3rem 0;
    margin-left: 0;
    margin-top: 0.2rem;
  }
`;

export const DetailTitleGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1rem;
  min-width: 0;

  @media (min-width: 641px) {
    gap: 1.2rem 2rem;
  }

  & h1 {
    margin: 0;
    line-height: 1.2;
    min-width: 0;
    flex: 1 1 auto;
    overflow-wrap: anywhere;
  }
`;
