import { SocialsEnum } from "./types";
import GitHubLogo from "../../assets/socials/gh-logo";
import TwitterLogo from "../../assets/socials/tw-logo";
import DiscordLogo from "../../assets/socials/dc-logo";
import { SOCIALS_LINKS } from "../../config";

export const defaultSocialsItems = [
  {
    name: SocialsEnum.GITHUB,
    href: SOCIALS_LINKS[SocialsEnum.GITHUB],
    Icon: GitHubLogo,
  },
  {
    name: SocialsEnum.TWITTER,
    href: SOCIALS_LINKS[SocialsEnum.TWITTER],
    Icon: TwitterLogo,
  },
  {
    name: SocialsEnum.DISCORD,
    href: SOCIALS_LINKS[SocialsEnum.DISCORD],
    Icon: DiscordLogo,
  },
];
