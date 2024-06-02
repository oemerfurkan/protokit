"use client";
import { Faucet } from "@/components/faucet";
import { useFaucet, useHumanId } from "@/lib/stores/balances";
import { useWalletStore } from "@/lib/stores/wallet";

export default function Home() {
  const wallet = useWalletStore();
  const drip = useFaucet();
  const addId = useHumanId();

  return (
    <div className="mx-auto -mt-32 h-full pt-16">
      <div className="flex h-full w-full items-center justify-center pt-16">
        <div className="flex basis-4/12 flex-col items-center justify-center 2xl:basis-3/12">
          <Faucet
            wallet={wallet.wallet}
            onConnectWallet={wallet.connectWallet}
            onDrip={drip}
            loading={false}
          />
          <button className="w-32 h-12 bg-black rounded-lg text-white flex justify-center items-center"
            onClick={addId}
          >
            Deneme
          </button>
        </div>
      </div>
    </div>
  );
}
