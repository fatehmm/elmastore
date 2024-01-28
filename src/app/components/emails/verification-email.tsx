import * as React from "react";

interface VerificationEmailTemplateProps {
  url: string;
}

export const VerificationEmailTemplate: React.FC<
  Readonly<VerificationEmailTemplateProps>
> = ({ url }) => (
  <div>
    <h1>Welcome, {url}!</h1>
    <a href={url}>sign in here</a>
  </div>
);
