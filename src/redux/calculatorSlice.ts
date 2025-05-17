// src/redux/calculatorSlice.ts
import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

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
  homeInsurance: number;
  hoaFees: number;
  utilities: number;
}

// This is the key fix for the type error - we need to allow custom property names
export interface FieldUpdatePayload {
  field: string;  // Changed from 'keyof CalculatorState' to 'string'
  value: string | number;
}

const initialState: CalculatorState = {
  homePrice: 300000,
  downPayment: 60000,
  interestRate: 6.5,
  loanTerm: 30,
  propertyTax: 3600, // Annual property tax
  zipCode: '',
  monthlyPayment: 0,
  principalAndInterest: 0,
  propertyTaxPayment: 0,
  homeInsurance: 132,
  hoaFees: 132,
  utilities: 100
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<FieldUpdatePayload>) => {
      const { field, value } = action.payload;
      // This is safer now - we check if the field exists before updating
      if (field in state) {
        (state as any)[field] = value;
      }
    },
    calculatePayment: (state) => {
      // Calculate loan amount
      const loanAmount = state.homePrice - state.downPayment;
      
      // Calculate monthly interest rate (annual rate divided by 12 months and converted to decimal)
      const monthlyInterestRate = state.interestRate / 100 / 12;
      
      // Calculate number of payments (years * 12 months)
      const numberOfPayments = state.loanTerm * 12;
      
      // Calculate principal and interest payment using the mortgage formula
      if (monthlyInterestRate === 0) {
        // If interest rate is 0, simply divide the loan amount by the number of payments
        state.principalAndInterest = loanAmount / numberOfPayments;
      } else {
        state.principalAndInterest = 
          loanAmount * 
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      }
      
      // Calculate monthly property tax payment
      state.propertyTaxPayment = state.propertyTax / 12;
      
      // Calculate total monthly payment (principal, interest, and property tax)
      state.monthlyPayment = state.principalAndInterest + state.propertyTaxPayment + state.homeInsurance + state.hoaFees + state.utilities;
    }
  }
});

export const { updateField, calculatePayment } = calculatorSlice.actions;
export default calculatorSlice.reducer;