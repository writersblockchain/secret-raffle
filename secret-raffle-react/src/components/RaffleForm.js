import { SecretjsFunctions } from "../secretJs/SecretjsFunctions";
import { useState } from "react";
import RaffleModal from "./RaffleModal";

export default function RaffleForm() {
  const { try_spin, query_spin, querySpinTx, querySpinBinary } =
    SecretjsFunctions();

  const [max, setMax] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await try_spin(max);

      await query_spin();
      setOpen(true);
    } catch (error) {
      alert("Click the wallet icon to connect your keplr wallet.");
    }
  };
  return (
    <div className=" shadow sm:rounded-lg flex items-center justify-center flex-col ">
      <div className="px-4 py-5 sm:p-6">
        {/* <h3 className="text-base font-semibold leading-6 text-white">
          Secret Raffle
        </h3> */}
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Enter a number between 1 and 1,000,000.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="text"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="1337"
            />
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Submit
          </button>
        </form>
        <RaffleModal
          open={open}
          setOpen={setOpen}
          querySpinTx={querySpinTx}
          querySpinBinary={querySpinBinary}
        />
      </div>
    </div>
  );
}
