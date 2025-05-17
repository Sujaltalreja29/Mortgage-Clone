// src/pages/MortgageCalculator.tsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, calculatePayment } from '../redux/calculatorSlice';
import { type RootState } from '../redux/store';

const MortgageCalculator = () => {
  const dispatch = useDispatch();
  const calculator = useSelector((state: RootState) => state.calculator);

  // Local state for form inputs
  const [homePrice, setHomePrice] = useState(calculator.homePrice.toString());
  const [downPayment, setDownPayment] = useState(calculator.downPayment.toString());
  const [interestRate, setInterestRate] = useState(calculator.interestRate.toString());
  const [zipCode, setZipCode] = useState(calculator.zipCode);
  const [loanTerm, setLoanTerm] = useState(calculator.loanTerm.toString());
  const [propertyTax, setPropertyTax] = useState('265');
  const [homeInsurance, setHomeInsurance] = useState('132');
  const [hoaFees, setHoaFees] = useState('132');
  const [utilities, setUtilities] = useState('100');
  const [priceRangeValue, setPriceRangeValue] = useState(calculator.homePrice);
  const [copySuccess, setCopySuccess] = useState(false);

  // Calculate total monthly payment
  const totalMonthlyPayment =
    calculator.principalAndInterest +
    parseFloat(propertyTax) +
    parseFloat(homeInsurance) +
    parseFloat(hoaFees) +
    parseFloat(utilities);

    console.log(totalMonthlyPayment, calculator.principalAndInterest, calculator.propertyTaxPayment, parseFloat(homeInsurance), parseFloat(hoaFees), parseFloat(utilities));
  // Calculate payment breakdown percentages for the visual bar
  const piecePercentages = {
    principalAndInterest: (calculator.principalAndInterest / totalMonthlyPayment) * 100,
    propertyTaxes: (calculator.propertyTaxPayment / totalMonthlyPayment) * 100,
    homeInsurance: (parseFloat(homeInsurance) / totalMonthlyPayment) * 100,
    hoaFees: (parseFloat(hoaFees) / totalMonthlyPayment) * 100,
    utilities: (parseFloat(utilities) / totalMonthlyPayment) * 100,
  };

  // Handle form changes
  const handleInputChange = (field: string, value: string) => {
    // Update local state
    switch (field) {
      case 'homePrice':
        setHomePrice(value);
        if (!isNaN(parseFloat(value))) {
          setPriceRangeValue(parseFloat(value));
        }
        break;
      case 'propertyTax':
        setPropertyTax(value);
        break;
      case 'downPayment':
        setDownPayment(value);
        break;
      case 'interestRate':
        setInterestRate(value);
        break;
      case 'zipCode':
        setZipCode(value);
        break;
      case 'loanTerm':
        setLoanTerm(value);
        break;
      case 'homeInsurance':
        setHomeInsurance(value);
        break;
      case 'hoaFees':
        setHoaFees(value);
        break;
      case 'utilities':
        setUtilities(value);
        break;
    }

    // Update redux state for core calculation fields
    if (['homePrice', 'downPayment', 'interestRate', 'loanTerm', 'zipCode'].includes(field)) {
      const numValue = field === 'zipCode' ? value : parseFloat(value) || 0;
      dispatch(updateField({ field, value: numValue }));
    }
  };

  // Handle slider change for home price
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPriceRangeValue(value);
    setHomePrice(value.toString());
    dispatch(updateField({ field: 'homePrice', value }));
  };

  // // Format currency
  // const formatCurrency = (value: number): string => {
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0,
  //   }).format(value);
  // };

  // Copy estimate link to clipboard
  const copyEstimateLink = () => {
    const estimateParams = new URLSearchParams();
    estimateParams.set('homePrice', homePrice);
    estimateParams.set('downPayment', downPayment);
    estimateParams.set('interestRate', interestRate);
    estimateParams.set('loanTerm', loanTerm);
    estimateParams.set('zipCode', zipCode);

    const estimateLink = `${window.location.origin}/calculator?${estimateParams.toString()}`;
    navigator.clipboard.writeText(estimateLink)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => console.error('Could not copy text: ', err));
  };

  // Calculate payment whenever inputs change
  useEffect(() => {
    dispatch(calculatePayment());
  }, [calculator.homePrice, calculator.downPayment, calculator.interestRate, calculator.loanTerm, dispatch]);

  // Parse URL parameters if they exist
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlHomePrice = params.get('homePrice');
    const urlDownPayment = params.get('downPayment');
    const urlInterestRate = params.get('interestRate');
    const urlLoanTerm = params.get('loanTerm');
    const urlZipCode = params.get('zipCode');

    if (urlHomePrice) {
      setHomePrice(urlHomePrice);
      dispatch(updateField({ field: 'homePrice', value: parseFloat(urlHomePrice) }));
      setPriceRangeValue(parseFloat(urlHomePrice));
    }
    if (urlDownPayment) {
      setDownPayment(urlDownPayment);
      dispatch(updateField({ field: 'downPayment', value: parseFloat(urlDownPayment) }));
    }
    if (urlInterestRate) {
      setInterestRate(urlInterestRate);
      dispatch(updateField({ field: 'interestRate', value: parseFloat(urlInterestRate) }));
    }
    if (urlLoanTerm) {
      setLoanTerm(urlLoanTerm);
      dispatch(updateField({ field: 'loanTerm', value: parseFloat(urlLoanTerm) }));
    }
    if (urlZipCode) {
      setZipCode(urlZipCode);
      dispatch(updateField({ field: 'zipCode', value: urlZipCode }));
    }
  }, [dispatch]);

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mortgage calculator</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Our mortgage calculator includes key factors like homeowners association fees, property taxes, and
          private mortgage insurance (PMI). Get the whole picture and calculate your total monthly payment.
        </p>
      </div>

      {/* Top Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Home Price & Payment */}
            <div>
              <div className="mb-8">
                <label htmlFor="homePrice" className="block text-lg font-medium text-gray-700 mb-2">
                  Home price
                </label>
                <div className="relative rounded-md shadow-sm mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg">$</span>
                  </div>
                  <input
                    type="text"
                    name="homePrice"
                    id="homePrice"
                    className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-12 text-xl py-3 border-gray-300 rounded-md"
                    placeholder="300000"
                    value={homePrice}
                    onChange={(e) => handleInputChange('homePrice', e.target.value)}
                  />
                </div>

                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="10000"
                  value={priceRangeValue}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-medium text-gray-700">Monthly payment</h2>
                  <span className="text-3xl font-bold text-gray-900">${totalMonthlyPayment.toFixed(2)}/mo</span>
                </div>
                <button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
                  onClick={() => window.location.href = '/start'}
                >
                  Get pre-approved
                </button>
              </div>
            </div>

            {/* Right Column - Other Inputs */}
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* ZIP Code */}
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  className="focus:ring-emerald-500 focus:border-emerald-500 block w-full py-2 px-3 border-gray-300 rounded-md"
                  placeholder="Enter ZIP code"
                  value={zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                />
              </div>

              {/* Down Payment */}
              <div>
                <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-2">
                  Down payment
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="downPayment"
                    id="downPayment"
                    className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 py-2 border-gray-300 rounded-md"
                    placeholder="60000"
                    value={downPayment}
                    onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
                  Interest rate
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="interestRate"
                    id="interestRate"
                    className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pr-10 py-2 border-gray-300 rounded-md"
                    placeholder="6.5"
                    value={interestRate}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-2">
                  Length of loan (years)
                </label>
                <select
                  id="loanTerm"
                  name="loanTerm"
                  className="focus:ring-emerald-500 focus:border-emerald-500 block w-full py-2 pl-3 pr-10 border-gray-300 rounded-md"
                  value={loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                >
                  <option value="30">30</option>
                  <option value="20">20</option>
                  <option value="15">15</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Breakdown Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md min-h-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Monthly payment breakdown</h2>

          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">${totalMonthlyPayment.toFixed(2)}/mo</span>
          </div>

          {/* Visual Payment Breakdown Bar */}
          <div className="h-12 flex rounded-full overflow-hidden mb-8">
            <div
              className="bg-emerald-800 h-full"
              style={{ width: `${piecePercentages.principalAndInterest}%` }}
            ></div>
            <div
              className="bg-purple-700 h-full"
              style={{ width: `${piecePercentages.propertyTaxes}%` }}
            ></div>
            <div
              className="bg-pink-300 h-full"
              style={{ width: `${piecePercentages.homeInsurance}%` }}
            ></div>
            <div
              className="bg-yellow-300 h-full"
              style={{ width: `${piecePercentages.hoaFees}%` }}
            ></div>
            <div
              className="bg-orange-400 h-full"
              style={{ width: `${piecePercentages.utilities}%` }}
            ></div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-4">
            {/* Principal & Interest */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-1 h-6 bg-emerald-800 mr-3"></div>
                <span className="text-gray-700 font-medium">Principal & interest</span>
              </div>
              <div className="text-right text-gray-900 font-bold">
                ${calculator.principalAndInterest.toFixed(2)}
              </div>
            </div>


            {/* Property Taxes */}
            <div className="flex items-center justify-between">
  <div className="flex items-center">
    <div className="w-1 h-6 bg-purple-700 mr-3"></div>
    <span className="text-gray-700 font-medium">Property taxes</span>
  </div>
  <div className="relative">
    <input
      type="text"
      className="border border-gray-300 rounded-md py-2 px-4 w-40 text-right focus:ring-emerald-500 focus:border-emerald-500"
      value={propertyTax}
      onChange={(e) => handleInputChange('propertyTax', e.target.value)}
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <span className="text-gray-500">$</span>
    </div>
  </div>
</div>

            {/* Homeowners Insurance */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-1 h-6 bg-pink-300 mr-3"></div>
                <span className="text-gray-700 font-medium">Homeowners insurance</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-4 w-40 text-right focus:ring-emerald-500 focus:border-emerald-500"
                  value={homeInsurance}
                  onChange={(e) => handleInputChange('homeInsurance', e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
              </div>
            </div>

            {/* HOA Fees */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-1 h-6 bg-yellow-300 mr-3"></div>
                <span className="text-gray-700 font-medium">HOA fees</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-4 w-40 text-right focus:ring-emerald-500 focus:border-emerald-500"
                  value={hoaFees}
                  onChange={(e) => handleInputChange('hoaFees', e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
              </div>
            </div>

            {/* Utilities */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-1 h-6 bg-orange-400 mr-3"></div>
                <span className="text-gray-700 font-medium">Utilities</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-4 w-40 text-right focus:ring-emerald-500 focus:border-emerald-500"
                  value={utilities}
                  onChange={(e) => handleInputChange('utilities', e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy Estimate Link Button */}
          <div className="mt-10">
            <button
              onClick={copyEstimateLink}
              className={`inline-flex items-center px-4 py-2 ${copySuccess ? 'bg-emerald-100 text-emerald-800' : 'bg-green-50 text-emerald-600 hover:bg-emerald-100'
                } rounded-md text-sm font-medium transition-colors duration-300`}
            >
              {copySuccess ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy estimate link
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Information Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Understanding Your Payment */}
          <div className="bg-white p-8 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Understanding Your Payment</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Principal and Interest</h3>
                <p className="text-gray-600">
                  This is the core of your mortgage payment and covers both the amount borrowed (principal) and the cost of borrowing (interest).
                  As you make payments, more of your payment goes toward the principal and less toward interest.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Property Taxes</h3>
                <p className="text-gray-600">
                  Property taxes are assessed by your local government and fund local services such as schools, roads, and emergency services.
                  These vary widely depending on your location and the value of your home.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Homeowners Insurance</h3>
                <p className="text-gray-600">
                  This insurance protects your home and possessions against damage, theft, and certain disasters.
                  Most mortgage lenders require homeowners insurance as a condition of your loan.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Costs */}
          <div className="bg-white p-8 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Additional Housing Costs</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">HOA Fees</h3>
                <p className="text-gray-600">
                  If you buy a home in a community with a Homeowners Association (HOA), you'll likely pay monthly or annual fees.
                  These cover maintenance of common areas, amenities, and sometimes utilities for the community.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Utilities</h3>
                <p className="text-gray-600">
                  Don't forget to budget for utilities like electricity, water, gas, internet, and trash removal.
                  These costs can vary significantly based on your location, the size of your home, and your usage.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Maintenance</h3>
                <p className="text-gray-600">
                  Homeowners should set aside 1-3% of their home's value annually for maintenance and repairs.
                  Regular upkeep prevents small issues from becoming costly problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-emerald-800 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to take the next step?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Get pre-approved and know exactly how much home you can afford. Our online process is quick, easy, and there's no obligation.
          </p>
          <button
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-emerald-900 bg-emerald-300 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-300 transform hover:scale-105"
            onClick={() => window.location.href = '/start'}
          >
            Start your application
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-4 bg-blue-50 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 text-sm text-blue-700">
              <p>
                This calculator provides estimates based on the information you provide. Actual rates, payments, and costs may vary.
                Contact a Better mortgage expert for a personalized quote based on your specific situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;