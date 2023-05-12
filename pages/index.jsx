import styled from "styled-components";
import { Routes } from "@config/routes";
import Link from "next/link";
import { Button, ButtonColor, ButtonSize, ButtonIcon } from "@features/ui";
import { color, space, textFont } from "@styles/theme";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
`;

const Header = styled.header`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100%;
  background: white;
  padding: 0 2rem;
  margin: 0 80px auto;
`;

const Nav = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  & a {
    ${textFont("md", "medium")};
    color: ${color("gray", 500)};
    text-decoration: none;
  }
`;

const ContactButton = styled.button`
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  padding: 1rem;
  background: #7f56d9;
  border-radius: 50%;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border: none;
  cursor: pointer;

  &:hover {
    background: #6941c6;
  }
`;

const DashboardButton = styled(Link)`
  width: 100%;
  color: white;
  text-decoration: none;
`;

const ModalContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: ${space(0, 4)};
  background-color: rgba(52, 64, 84, 0.6);
  z-index: 3;
  top: 0;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25rem;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  border-radius: 12px;
  background-color: white;
  padding: ${space(6)};
  gap: ${space(8)};

  @media screen and (max-width: 920px) {
    width: 21.4375rem;
  }
`;

const ModalTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ModalTitle = styled.span`
  color: ${color("gray", 900)};
  ${textFont("lg", "medium")};
`;

const ModalBodyText = styled.span`
  color: ${color("gray", 500)};
  ${textFont("sm", "normal")};
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

const IssuesPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Header>
        <HeaderContent>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/logo-large.svg" alt="Prolog logo" />
          <Nav>
            <NavItem>
              <Link href={Routes.home}>Home</Link>
            </NavItem>
            <NavItem>
              <Link href={Routes.products}>Products</Link>
            </NavItem>
            <NavItem>
              <Link href={Routes.documentation}>Documentation</Link>
            </NavItem>
            <NavItem>
              <Link href={Routes.pricing}>Pricing</Link>
            </NavItem>
          </Nav>
          <Button
            icon={ButtonIcon.none}
            size={ButtonSize.lg}
            color={ButtonColor.primary}
          >
            <DashboardButton href={Routes.projects}>
              Open Dashboard
            </DashboardButton>
          </Button>
        </HeaderContent>
      </Header>
      <ContactButton onClick={() => setShowModal((show) => !show)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
      {showModal && (
        <ModalContainer>
          <ModalContent>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon-mail.svg" alt="Email Icon" />
            <ModalTextContainer>
              <ModalTitle>Contact Us Via Email</ModalTitle>
              <ModalBodyText>
                Any questions? Send us an email at prolog@profy.dev. We usually
                answer within 24 hours.
              </ModalBodyText>
            </ModalTextContainer>

            <ButtonsContainer>
              <Button
                icon={ButtonIcon.none}
                size={ButtonSize.lg}
                color={ButtonColor.gray}
                onClick={() => setShowModal(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                icon={ButtonIcon.none}
                size={ButtonSize.lg}
                color={ButtonColor.primary}
                style={{ flex: 1 }}
              >
                <DashboardButton
                  href="mailto:someone@yoursite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Email App
                </DashboardButton>
              </Button>
            </ButtonsContainer>
          </ModalContent>
        </ModalContainer>
      )}
    </Container>
  );
};

export default IssuesPage;
