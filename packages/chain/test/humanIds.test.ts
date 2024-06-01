import { InMemorySigner } from "@proto-kit/sdk";
import { UInt64 } from "@proto-kit/library";
import { client as appChain } from "./../src/client.config";
import { Field, PrivateKey, Provable } from "o1js";
import { HumanIds } from "../src/human-id";
import { sleep } from "@proto-kit/common";

const signer = PrivateKey.random();
const sender = signer.toPublicKey();

describe("interaction", () => {
  let humanIds: HumanIds;
  beforeAll(async () => {
    await appChain.start();

    const inMemorySigner = new InMemorySigner();

    appChain.registerValue({
      Signer: inMemorySigner,
    });

    const resolvedInMemorySigner = appChain.resolve("Signer") as InMemorySigner;
    resolvedInMemorySigner.config = { signer };

    humanIds = appChain.runtime.resolve("HumanIds");
  });

  it("should interact with the appChain", async () => {
    const humanIdNumber = Field.from(32);

    const tx = await appChain.transaction(sender, () => {
      humanIds.addHumanId(humanIdNumber);
    });

    await tx.sign();
    await tx.send();

    await sleep(8000);

    const humanId = await appChain.query.runtime.HumanIds.humanIds.get(sender);
    Provable.log("HumanID", sender, humanId);
  });
});
