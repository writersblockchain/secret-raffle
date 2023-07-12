import { SecretjsContext } from "./secretJs/SecretjsContext";
import { useContext } from "react";
import "./App.css";
import RaffleForm from "./components/RaffleForm";
import SecretToken from "./components/SecretToken";
import { WalletIcon } from "@heroicons/react/24/outline";

function App() {
  const { connectWallet } = useContext(SecretjsContext);
  return (
    <div className="App">
      <div className="flex justify-end mr-12 mt-8">
        <WalletIcon
          onClick={connectWallet}
          className="h-10 w-10 text-white hover:text-indigo-500  "
        />
      </div>
      <SecretToken />
      <h1 className="text-white text-2xl text-center -mt-5 ">
        Secret Network Raffle
      </h1>
      <RaffleForm />
      <p className="mt-4 text-center text-sm text-gray-400">
        Built on{" "}
        <a
          href="https://docs.scrt.network/secret-network-documentation/development/development-concepts/randomness-api/native-on-chain-randomness"
          className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
        >
          Secret.
        </a>
      </p>
    </div>
  );
}

export default App;
