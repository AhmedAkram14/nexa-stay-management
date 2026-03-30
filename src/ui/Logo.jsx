import styled from "styled-components";

/** Matches expanded logo height — keeps nav tabs aligned when toggling collapse */
const LOGO_SLOT_HEIGHT = "12rem";

const COLLAPSED_LOGO_HEIGHT = "4.8rem";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: ${LOGO_SLOT_HEIGHT};
  min-height: ${LOGO_SLOT_HEIGHT};
  text-align: center;
`;

const Img = styled.img`
  width: auto;
  height: ${({ $collapsed }) =>
    $collapsed ? COLLAPSED_LOGO_HEIGHT : LOGO_SLOT_HEIGHT};
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: height 0.28s cubic-bezier(0.4, 0, 0.2, 1);
`;

function Logo({ collapsed = false }) {
  return (
    <StyledLogo>
      <Img $collapsed={collapsed} src="/logo.png" alt="Nexa Stay" />
    </StyledLogo>
  );
}

export default Logo;
