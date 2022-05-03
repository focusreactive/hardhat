import { OrderType, TocSubitem } from "./types";

export const generateSlug = (pluginName: string): string =>
  pluginName.replace(/^@/, "").replace(/\//g, "-");

export const getPluginsSubitems = (
  path: string,
  order: OrderType[]
): TocSubitem[] => {
  return order.map((item: OrderType) => {
    if (typeof item === "object") {
      return {
        label: item.title,
        href: item.href,
      };
    }
    return {
      label: item,
      href: `/${path}/${generateSlug(item)}`,
    };
  });
};
