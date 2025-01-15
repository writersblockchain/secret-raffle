import { useContext, useState } from "react";
import { SecretjsContext } from "./SecretjsContext";

const contractCodeHash =
  "74807322a4b78b95204825da46dee59294ee1bcf1797c29d6e9fed687840d3d0";
const contractAddress = "secret1hxhp7vu3eywv20sr8upl427jdcjlf7fgaq3wpd";

const SecretjsFunctions = () => {
  const { secretjs, secretAddress } = useContext(SecretjsContext);
  const [querySpinTx, setQuerySpinTx] = useState(null);
  const [querySpinBinary, setQuerySpinBinary] = useState("");

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
    const spinBinary = tx.random_binary;
    // Save the number into the state
    setQuerySpinTx(raffleNumber);
    setQuerySpinBinary(spinBinary);
    console.log(tx);
  };

  // query_spin();
  return {
    try_spin,
    query_spin,
    querySpinTx,
    querySpinBinary,
  };
};

export { SecretjsFunctions };
