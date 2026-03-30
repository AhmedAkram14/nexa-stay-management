import styled from 'styled-components';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import TodayItem from './TodayItem';
import { useTodayActivity } from './useTodayActivity';

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  min-width: 0;
  padding-top: 2.4rem;

  @media (min-width: 1201px) {
    align-self: stretch;
    min-height: 0;
  }

  @media (max-width: 1200px) {
    grid-column: 1 / -1;
  }

  @media (max-width: 640px) {
    padding: 2rem 1.6rem;
    gap: 1.6rem;
  }
`;

const TodayContent = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 1201px) {
    justify-content: ${(props) => (props.$center ? "center" : "flex-start")};
    align-items: ${(props) => (props.$center ? "center" : "stretch")};
  }
`;

const TodayList = styled.ul`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: auto;
  min-width: 0;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;

  @media (min-width: 1201px) {
    margin-top: 0;
  }
`;

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {!isLoading ? (
        <TodayContent $center={activities.length === 0}>
          {activities.length > 0 ? (
            <TodayList>
              {activities.map((activity) => (
                <TodayItem activity={activity} key={activity.id} />
              ))}
            </TodayList>
          ) : (
            <NoActivity>No activity today...</NoActivity>
          )}
        </TodayContent>
      ) : (
        <TodayContent $center>
          <Spinner />
        </TodayContent>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
