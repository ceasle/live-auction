// TODO: Add username after Oauth implementation
export type UserProps = {
  upcomingAuctions: AuctionProps[];
  hostedAuctions: AuctionProps[];
};

export type AuctionProps = {
  name: string;
  description: string;
  auctionId: number;
  items: ItemProps[];
};

export type ItemProps = {
  name: string;
  description: string;
  itemId: number;
  basePrice: number;
  // TODO: Add image to item
};

export const defaultAuction = {
  name: "Auction1",
  description: "XYZ",
  auctionId: 12345,
  items: [],
};

export const defaultUserProps = {
  upcomingAuctions: [defaultAuction],
  hostedAuctions: [],
};
