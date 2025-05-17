export interface CalculatorState {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  zipCode: string;
  monthlyPayment: number;
  principalAndInterest: number;
  propertyTaxPayment: number;
}

export type FieldUpdatePayload = {
  field: keyof CalculatorState;
  value: string | number;
};