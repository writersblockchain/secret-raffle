import { useContext, useState } from "react";
import { SecretjsContext } from "./SecretjsContext";

const contractCodeHash =
  "236456414a260a62e57f8142b4d3793df1072c6dd9cc76bc9f5817a72872d2a3";
const contractAddress = "secret1sszujacjmtfcm2yc37gvl57sy06qcs86wqrwp2";

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
