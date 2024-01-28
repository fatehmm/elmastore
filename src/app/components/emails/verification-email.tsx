import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailTemplateProps {
  url: string;
  baseUrl: string;
}

export const VerificationEmailTemplate = ({
  url,
  baseUrl,
}: VerificationEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi,</Text>
        <Text style={paragraph}>
          Welcome to Elma Store, the sales platform that offers you cheapest
          iPhones faster.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`${baseUrl}/confirm-email?link=${url}`}>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Elma Store team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Koc Universitesi Bati Kampusu, Zekeriyakoy Mah., Sariyer, Istanbul.
          <br />
          Maharram Musayev
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
