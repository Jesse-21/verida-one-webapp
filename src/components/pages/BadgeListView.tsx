import React from "react";
import { PageWrapper, RedirectionCard } from "components/molecules";
import { BadgeGrid } from "components/organisms";
import { useBadges, useProfileData } from "lib/hooks";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

export const BadgeListView: React.FunctionComponent = () => {
  const i18n = useIntl();
  const { identity } = useParams();

  const { data: profileData } = useProfileData(identity);
  const walletAddresses = profileData?.walletAddresses;
  const { data: badges } = useBadges(walletAddresses);

  const redirectPath = identity ? `/${identity}` : `/`;

  const redirectionCardButtonLabel = i18n.formatMessage({
    id: "BadgeListView.redirectionCardButtonLabel",
    description: "Label of the redirection link to go to the Profile poage",
    defaultMessage: "Go to profile",
  });

  const redirectionCardTitle = i18n.formatMessage({
    id: "BadgeListView.redirectionCardTitle",
    defaultMessage: "It's empty here",
    description:
      "Title of the redirection card indicating the list of badges is empty.",
  });

  const redirectionCardMessage = i18n.formatMessage({
    id: "BadgeListView.redirectionCardMessage",
    defaultMessage: "There are no badges to see",
    description:
      "Message of the redirection card indicating the list of badges is empty.",
  });

  const pageTitle = i18n.formatMessage({
    id: "BadgeListView.pageTitle",
    description: "Title of the 'Badges' page",
    defaultMessage: "Badges",
  });

  // TODO: Handle loading state
  // TODO: Handle error state

  return (
    <PageWrapper title={pageTitle} badgeValue={badges?.length}>
      {badges?.length ? (
        <BadgeGrid className="pt-2" badges={badges} />
      ) : (
        <RedirectionCard
          redirectPath={redirectPath}
          title={redirectionCardTitle}
          message={redirectionCardMessage}
          buttonLabel={redirectionCardButtonLabel}
          className="flex flex-grow flex-col justify-center"
        />
      )}
    </PageWrapper>
  );
};
