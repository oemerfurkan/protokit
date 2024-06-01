import {
  RuntimeModule,
  runtimeMethod,
  runtimeModule,
  state,
} from "@proto-kit/module";
import { StateMap, State } from "@proto-kit/protocol";
import { UInt64 } from "@proto-kit/library";
import { HumanIdData, HumanId } from "./human-ids";
import { Field, PublicKey } from "o1js";

@runtimeModule()
export class HumanIds extends RuntimeModule<Record<string, never>> {
  @state() public humanIds = StateMap.from<PublicKey, HumanIdData>(
    PublicKey,
    HumanIdData
  );

  @state() public nextHumanId = State.from<UInt64>(UInt64);

  @runtimeMethod()
  public addHumanId(humanId: Field) {
    const currentHumanId = HumanId.from(humanId);
    const owner = this.transaction.sender.value;
    const createdAt = UInt64.from(this.network.block.height);
    const path = this.nextHumanId.get();

    const humanIdData = new HumanIdData({
      humanId: currentHumanId,
      owner,
      createdAt,
    });

    this.humanIds.set(humanIdData.owner, humanIdData);
  }
}
