import React from "react";

import { Link } from "react-router";
import styled from "styled-components";

import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import CheckoutButton from "./CheckoutButton";

const TopRow = styled.div`
  display: contents;
`;

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 9rem) minmax(0, 2.4rem) minmax(0, 1fr) minmax(0, 6rem) auto;
  gap: 1rem 1.2rem;
  align-items: center;
  min-width: 0;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1.2rem 0;

    ${TopRow} {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.8rem;
      flex-wrap: wrap;
      min-width: 0;
    }
  }
`;

const Guest = styled.div`
  font-weight: 500;
  min-width: 0;
  overflow-wrap: anywhere;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NightsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  text-align: right;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    gap: 1rem;
  }
`;

const NightsLabel = styled.span`
  display: none;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-grey-500);

  @media (max-width: 768px) {
    display: block;
  }
`;

const NightsValue = styled.span`
  font-variant-numeric: tabular-nums;
`;

const ActionWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 0;

  @media (max-width: 768px) {
    justify-content: stretch;

    & > * {
      width: 100%;
    }
  }
`;

const statusLabel = {
  unconfirmed: "Check in",
  "checked-in": "Check out",
};

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  return (
    <StyledTodayItem>
      <TopRow>
        {status === "unconfirmed" && (
          <Tag type="green" title={statusLabel.unconfirmed}>
            Arriving
          </Tag>
        )}
        {status === "checked-in" && (
          <Tag type="blue" title={statusLabel["checked-in"]}>
            Departing
          </Tag>
        )}
        <Flag src={guests.countryFlag} alt={guests.country || ""} />
      </TopRow>
      <Guest>{guests.fullName}</Guest>
      <NightsBlock>
        <NightsLabel>Nights</NightsLabel>
        <NightsValue>{numNights}</NightsValue>
      </NightsBlock>
      <ActionWrap>
        {status === "unconfirmed" && (
          <Button
            size="small"
            variation="primary"
            as={Link}
            to={`/checkin/${id}`}
          >
            Check-in
          </Button>
        )}
        {status === "checked-in" && <CheckoutButton bookingId={id} />}
      </ActionWrap>
    </StyledTodayItem>
  );
}

export default TodayItem;
