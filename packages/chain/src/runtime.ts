import { Balance } from "@proto-kit/library";
import { Balances } from "./balances";
import { ModulesConfig } from "@proto-kit/common";
import { GuestBook } from "./guest-book";
import { HumanIds } from "./human-id";

export const modules = {
  Balances,
  GuestBook,
  HumanIds,
};

export const config: ModulesConfig<typeof modules> = {
  Balances: {
    totalSupply: Balance.from(10_000),
  },
  GuestBook: {},
  HumanIds: {},
};

export default {
  modules,
  config,
};
