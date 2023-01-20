// Temporary data for development purpose
import { Profile } from "lib/types";
import { profile as profile6529 } from "./data-6529";
import { profile as profileRyan } from "./data-ryan";

export const getMockIdentityProfile = async (
  identityId?: string
): Promise<Profile> => {
  switch (identityId) {
    case "6529":
      return Promise.resolve(profile6529);
    default:
      return Promise.resolve(profileRyan);
  }
};
