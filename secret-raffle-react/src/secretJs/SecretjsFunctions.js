import { useContext, useState } from "react";
import { SecretjsContext } from "./SecretjsContext";

const contractCodeHash =
  "6877ed05df499c9e98bf40d09c779eceddbe39f0ee9d5abc6f911bf4a12061e6";
const contractAddress = "secret1rmpekfgvypzt98tuakzm76jeg54afrd8phwew8";

const SecretjsFunctions = () => {
  const { secretjs, secretAddress } = useContext(SecretjsContext);
  const [querySpinTx, setQuerySpinTx] = useState(null);

  let try_spin = async (max) => {
    const tx = await secretjs.tx.compute.executeContract(
      {
        sender: secretAddress,
        contract_address: contractAddress,
        msg: {
          spin_raffle_wheel: {
            max: parseInt(max),
          },
        },
        code_hash: contractCodeHash,
      },
      { gasLimit: 100_000 }
    );

    console.log(tx);
  };
  // try_spin();

  let query_spin = async () => {
    let tx = await secretjs.query.compute.queryContract({
      contract_address: contractAddress,
      code_hash: contractCodeHash,
      query: {
        get_raffle_number: {},
      },
    });
    // Access the 'current_raffle_number' field
    const raffleNumber = tx.current_raffle_number;

    // Save the number into the state
    setQuerySpinTx(raffleNumber);
    console.log(tx);
  };

  // query_spin();
  return {
    try_spin,
    query_spin,
    querySpinTx,
  };
};

export { SecretjsFunctions };
