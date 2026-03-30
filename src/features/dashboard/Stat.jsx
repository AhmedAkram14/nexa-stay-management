import styled from "styled-components";

const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  min-width: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 640px) {
    padding: 1.2rem 1.4rem;
    gap: 1.2rem;
  }
`;

const Icon = styled.div`
  flex-shrink: 0;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }

  @media (max-width: 640px) {
    width: 5.2rem;
    height: 5.2rem;

    & svg {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.4rem;
  min-width: 0;
`;

const Title = styled.h5`
  margin: 0;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
  line-height: 1.2;
`;

const Value = styled.p`
  margin: 0;
  font-size: clamp(1.6rem, 3.2vw, 2.4rem);
  line-height: 1.15;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function Stat({ icon, title, value, color }) {
  const fullLabel =
    value !== null && value !== undefined ? String(value) : undefined;

  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Text>
        <Title>{title}</Title>
        <Value title={fullLabel}>{value}</Value>
      </Text>
    </StyledStat>
  );
}

export default Stat;
