import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { SidebarNavigation } from "../sidebar-navigation";
import { color, displayFont, textFont, space, breakpoint } from "@styles/theme";

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
  info: string;
};

const footerList = [
  { text: "Docs", href: "#" },
  { text: "API", href: "#" },
  { text: "Help", href: "#" },
  { text: "Community", href: "#" },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${color("gray", 900)};

  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: row;
  }
`;

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  min-height: calc(
    100vh - 2 * ${space(8)} - ${({ theme }) => theme.size.headerHeight} -
      ${({ theme }) => theme.size.footerHeight.mobile}
  );
  margin-top: ${({ theme }) => theme.size.headerHeight};
  padding: ${space(8, 3)};
  background: white;

  @media (min-width: ${breakpoint("desktop")}) {
    min-height: calc(
      100vh - ${space(3)} - 2 * ${space(8)} -
        ${({ theme }) => theme.size.footerHeight.desktop}
    );
    margin-top: ${space(3)};
    padding: ${space(8)};
    border-top-left-radius: ${space(10)};
  }
`;

const Title = styled.h1`
  margin: ${space(0, 0, 1)};
  color: ${color("gray", 900)};
  ${displayFont("sm", "medium")}
`;

const Info = styled.div`
  margin-bottom: ${space(8)};
  color: ${color("gray", 500)};
  ${textFont("md", "regular")}
`;

const Footer = styled.div.attrs({
  "data-cy": "page-content-footer",
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.size.footerHeight.mobile};
  background: ${color("gray", 50)};
  gap: ${space(6)};

  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: row;
    justify-content: space-between;
    height: ${({ theme }) => theme.size.footerHeight.desktop};
    padding: 0 ${space(8)};
  }
`;

const Version = styled.div`
  width: calc(2 * ${space(20)});
  color: ${color("gray", 400)};
  text-align: center;
  order: 3;

  @media (min-width: ${breakpoint("desktop")}) {
    text-align: left;
    order: 1;
  }
`;

const List = styled.ul`
  display: flex;
  flex-firection: row;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: ${space(6)};
  order: 1;

  @media (min-width: ${breakpoint("desktop")}) {
    order: 2;
  }
`;

const FooterAnchor = styled(Link)`
  ${textFont("md", "medium")};
  color: ${color("gray", 500)};
  text-decoration: none;
`;

const Logo = styled.img`
  width: 1.4375em;
`;

const LogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(2 * ${space(20)});
  order: 2;

  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: column;
    align-items: flex-end;
    order: 3;
  }
`;

export function PageContainer({ children, title, info }: PageContainerProps) {
  // combine title in a single string to prevent below warning
  // "Warning: A title element received an array with more than 1 element as children."
  const documentTitle = `ProLog - ${title}`;

  return (
    <Container>
      <Head>
        <title>{documentTitle}</title>
        <meta name="description" content="Error monitoring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SidebarNavigation />
      <MainWrap>
        <Main>
          <ContentContainer>
            <Title>{title}</Title>
            <Info>{info}</Info>
            {children}
          </ContentContainer>
        </Main>
        <Footer>
          <Version>Version: {process.env.NEXT_PUBLIC_APP_VERSION}</Version>

          <List>
            {footerList.map((item, index) => (
              <li key={`footer-link-${index}`}>
                <FooterAnchor href={item.href}>{item.text}</FooterAnchor>
              </li>
            ))}
          </List>

          <LogoWrap>
            <Logo src="/icons/logo-small.svg" alt="footer logo small" />
          </LogoWrap>
        </Footer>
      </MainWrap>
    </Container>
  );
}
