import React from "react";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router";
import styled from "styled-components";

import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.2rem 1.6rem;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.8rem;
  }
`;

const Summary = styled.p`
  font-size: 1.4rem;
  margin-left: 0;
  flex: 1 1 auto;
  min-width: 0;
  color: var(--color-grey-500);

  & span {
    font-weight: 500;
    color: var(--color-grey-600);
  }

  @media (max-width: 520px) {
    margin: 0;
    max-width: 100%;
    font-size: 1.2rem;
    text-align: left;
    line-height: 1.4;
    order: 2;
    align-self: stretch;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 520px) {
    width: 100%;
    justify-content: flex-start;
    gap: 0.4rem;
    flex: 0 0 auto;
    order: 1;
  }
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: 1px solid transparent;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    border-color: var(--color-brand-600);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: 520px) {
    font-size: 1.2rem;
    padding: 0.45rem 0.85rem;
    background-color: var(--color-grey-0);
    color: var(--color-grey-600);
    border-color: var(--color-grey-200);
    box-shadow: none;

    & svg {
      height: 1.5rem;
      width: 1.5rem;
    }

    &:hover:not(:disabled) {
      background-color: var(--color-grey-50);
      color: var(--color-grey-800);
      border-color: var(--color-grey-300);
    }
  }
`;

const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const parsed = Number(rawPage);
  const currentPage =
    !rawPage || !Number.isFinite(parsed) || parsed < 1
      ? 1
      : Math.floor(parsed);
  const safeCount = Number.isFinite(count) ? count : 0;
  const pageCount = Math.max(1, Math.ceil(safeCount / PAGE_SIZE));
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }
  if (safeCount === 0 || pageCount <= 1) return null;
  return (
    <StyledPagination>
      <Summary>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage * PAGE_SIZE > safeCount
            ? safeCount
            : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{safeCount}</span> results
      </Summary>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
