import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.8rem 1.6rem;
  padding: 0.8rem 0;
  min-width: 0;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;
  flex: 0 1 auto;
  min-width: min(100%, 14rem);

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
    flex-shrink: 0;
  }
`;

const Value = styled.span`
  flex: 1 1 12rem;
  min-width: 0;
  word-break: break-word;
`;

function DataItem({ icon, label, children }) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      <Value>{children}</Value>
    </StyledDataItem>
  );
}

export default DataItem;
