import styled from "styled-components";
import { Routes } from "@config/routes";
import Link from "next/link";
import { Button, ButtonColor, ButtonSize, ButtonIcon } from "@features/ui";
import { color, space, textFont } from "@styles/theme";

const Header = styled.header`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const IssuesPage = () => {
  return (
    <div>
      <Header>
        <Container>
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
        </Container>
      </Header>
      <ContactButton
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal"
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
    </div>
  );
};

export default IssuesPage;
