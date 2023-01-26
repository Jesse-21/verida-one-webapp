import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import {
  BadgesSection,
  CollectiblesSection,
  CustomLinksSection,
  FeaturedSection,
  IdentityInfoSection,
  SocialMediaSection,
  WalletAddressesSection,
} from "components/organisms";
import {
  getMockBadges,
  getMockCollectibles,
  getMockFeaturedCollectibles,
  getMockFeaturedLinks,
  getMockLinks,
  getMockSocialMediaLinks,
  getMockWalletAddresses,
} from "lib/utils";
import {
  Badge,
  Collectible,
  CustomLink,
  SocialMediaLink,
  WalletAddress,
} from "lib/types";
import { useIdentityInfo } from "lib/hooks";
import { NoProfileFoundView } from "./NoProfileFoundView";

export const ProfileView: React.FC = () => {
  const [featuredCollectibles, setFeaturedCollectibles] = useState<
    Collectible[]
  >([]);
  const [featuredLinks, setFeaturedLinks] = useState<CustomLink[]>([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMediaLink[]>(
    []
  );
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([]);
  const [walletAddresses, setWalletAddresses] = useState<WalletAddress[]>([]);

  const i18n = useIntl();
  const { identity } = useParams();

  const notSharingOtherPublicInformationMessage = i18n.formatMessage({
    id: "ProfileView.notSharingPublicInformationMessage",
    defaultMessage: "This user is not sharing other public information",
    description: "Message to show user is not sharing other public information",
  });

  const { data: identityInfo, isError: isErrorIdentityInfo } =
    useIdentityInfo();

  useEffect(() => {
    const getData = async () => {
      setFeaturedCollectibles(await getMockFeaturedCollectibles(identity));
      setBadges(await getMockBadges(identity));
      setFeaturedLinks(await getMockFeaturedLinks(identity));
      setSocialMediaLinks(await getMockSocialMediaLinks(identity));
      setCollectibles(await getMockCollectibles(identity));
      setCustomLinks(await getMockLinks(identity));
      setWalletAddresses(await getMockWalletAddresses(identity));
    };

    void getData();
  }, [identity]);

  if (identityInfo) {
    const hasProfileData =
      featuredCollectibles?.length ||
      featuredLinks?.length ||
      socialMediaLinks?.length ||
      collectibles?.length ||
      badges?.length ||
      customLinks?.length ||
      walletAddresses?.length;
    // TODO: Get this 'hasProfileData' from the hook fetching the data when implemented

    return (
      <div>
        <div className="mb-7">
          <IdentityInfoSection identityInfo={identityInfo} />
        </div>
        {hasProfileData ? (
          <div className="space-y-10">
            <FeaturedSection
              collectibles={featuredCollectibles}
              links={featuredLinks}
            />
            <SocialMediaSection socialMediaLinks={socialMediaLinks} />
            <CollectiblesSection collectibles={collectibles} />
            {/** FIXME: Find a way to overlap the collectibles list above the padding of the main container */}
            <BadgesSection badges={badges} />
            <CustomLinksSection links={customLinks} />
            <WalletAddressesSection addresses={walletAddresses} />
          </div>
        ) : (
          <div className="rounded-xl bg-gray p-4 ">
            <p className="text-center text-sm text-primary/60">
              {notSharingOtherPublicInformationMessage}
            </p>
          </div>
        )}
        {/* TODO: Bring back the CTA when removed from the header */}
        {/* <div className="pt-10 pb-10">
        <ProfileCallToAction />
      </div> */}
      </div>
    );
  }

  if (isErrorIdentityInfo) {
    // TODO: Handle depending on error type
    return <NoProfileFoundView />;
  }

  // Loading state
  // TODO: Handle loading state
  return null;
};
