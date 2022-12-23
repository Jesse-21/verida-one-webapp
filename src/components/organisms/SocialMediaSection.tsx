import React from "react";
import { useIntl } from "react-intl";
import { SocialMediaLink as SocialMediaLinkType } from "lib/types";
import { ProfileSectionContainer, SocialMediaLink } from "components/molecules";

type SocialSectionProps = {
  socialMediaLinks: SocialMediaLinkType[];
};

/** Section for the Profile page rendering the list of Social Media links */
export const SocialMediaSection: React.FC<SocialSectionProps> = (props) => {
  const { socialMediaLinks } = props;

  const i18n = useIntl();

  if (socialMediaLinks.length === 0) {
    return null;
  }

  const sectionTitle = i18n.formatMessage({
    id: "SocialMediaSection.sectionTitle",
    description: "Title of the 'Socials' section in the 'Profile' page",
    defaultMessage: "Socials",
  });

  return (
    <ProfileSectionContainer title={sectionTitle}>
      <ul className="flex flex-wrap gap-3">
        {socialMediaLinks.map((link) => (
          <li key={link.url}>
            <SocialMediaLink link={link} />
          </li>
        ))}
      </ul>
    </ProfileSectionContainer>
  );
};
