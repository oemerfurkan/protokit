import { Field, PublicKey, Struct } from "o1js";
import { UInt64 } from "@proto-kit/library";

export class HumanId extends Field {};
export class HumanIdData extends Struct({
    humanId: HumanId,
    createdAt: UInt64,
    owner: PublicKey,
}) {}