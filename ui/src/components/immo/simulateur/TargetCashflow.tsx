import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import findPriceForCashflow from "./useCashflow500";
import type { ImmoFormData } from "./Simulator";

export interface TargetCashflowResult {
  cashflow: number;
  price: number;
  nego: number
}

interface TargetCashflowProps {
  form: ImmoFormData;
}

export const TargetCashflow: React.FC<TargetCashflowProps> = ({ form }) => {
  const results = getTargetPrices(form)
  return (
    <Card className="max-w-2xl mx-auto mt-6 shadow-md border rounded-2xl">
      <CardHeader>
          🎯 Cashflow Target Prices
      </CardHeader>
      <CardContent>
        {results.length > 0 ? (
            <table className="w-full border-collapse border border-gray-200 rounded-lg text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">Target Cashflow (€)</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Target Prix (€)</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Négociation (€)</th>
                </tr>
              </thead>
              <tbody>
                {results.map(({ cashflow, price, nego }) => (
                  <tr key={cashflow} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-medium">
                      {cashflow}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      €{price.toLocaleString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-red-600">
                      €{nego.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        ) : (
          <p className="text-sm text-muted-foreground">
            No results yet. Click “Calculate” to start.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

function getTargetPrices(form: ImmoFormData): TargetCashflowResult[] {
    const targets = [0, 100, 200, 300, 400, 500];
    const results = targets.map((target) => {
        const price = findPriceForCashflow(target, form);
        return { cashflow: Math.round(target), price: Math.round(price), nego: Math.round(form.prixVente - price) };
    });

    console.table(results);

    return results;
}
