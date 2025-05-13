import { useEffect, useState } from "react";

export default function Converter() {
  const [output, setOutput] = useState("");
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getApiData() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
          );

          if (!res.ok) throw new Error("Fail to fetch");

          const data = await res.json();
          setOutput(data.rates[to]);
        } catch (err) {
          console.log(err);
          setOutput("Fail to convert");
        } finally {
          setIsLoading(false);
        }
      }

      if (from === to) return setOutput(amount);

      getApiData();
    },
    [amount, from, to]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {to}
      </p>
    </div>
  );
}
