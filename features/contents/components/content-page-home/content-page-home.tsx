import { color, space, textFont } from "@styles/theme";
import Image from "next/image";
import styled from "styled-components";
import { useGetContent } from "../../api/use-get-home";

const HeroSection = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: ${space(24, 0)};
  width: 100%;
  gap: 4rem;
  background: ${color("gray", 50)};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const Title = styled.h1`
  text-align: center;
  color: ${color("gray", 900)};
  ${textFont("xl", "semibold")};
  letter-spacing: -0.02rem;
  margin: 0 auto;
`;

const Subtitle = styled.h2`
  text-align: center;
  color: ${color("gray", 500)};
  ${textFont("xl", "regular")};
  margin: 0 auto;
`;

const ImageContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ContentPageHome = () => {
  const content = useGetContent("home");

  if (content.isLoading) {
    return <div>Loading</div>;
  }

  if (content.isError) {
    console.error(content.error);
    return <div>Error loading content: {content.error.message}</div>;
  }

  const hero = content.data.sections[0];

  return (
    <HeroSection>
      <TextContainer>
        <Title>{hero.title}</Title>
        <Subtitle>{hero.subtitle}</Subtitle>
      </TextContainer>
      <ImageContainer>
        <Image
          src={`https://prolog-api.profy.dev${hero.image.src}`}
          width={hero.image.width}
          height={hero.image.height}
          alt="hero image"
        />
      </ImageContainer>
    </HeroSection>
  );
};
