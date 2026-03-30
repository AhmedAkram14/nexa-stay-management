import React from 'react';

import { useSearchParams } from 'react-router';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;

  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: flex-start;
    width: 100%;
  }

  @media (max-width: 520px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: thin;
    padding: 0.4rem 0.4rem 0.6rem;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-grey-300);
      border-radius: 4px;
    }
  }
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  flex-shrink: 0;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Filter = ({ filterField, options, defaultFilterValue = "all" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || defaultFilterValue;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter role="group" aria-label="Filter list">
      {options.map((option) => {
        const isActive = currentFilter === option.value;

        return (
          <FilterButton
            key={option.value}
            type="button"
            $active={isActive}
            disabled={isActive}
            aria-pressed={isActive}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </FilterButton>
        );
      })}
    </StyledFilter>
  );
};

export default Filter;
