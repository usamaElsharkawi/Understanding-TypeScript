type InvestmentData = {
  initialAmount: number;
  annualcontribution: number;
  expectedReturn: number;
  duration: number;
};

type InvestementResults = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalIntersedEarned: number;
};

type CalculationResults = InvestementResults[] | string;

function calculateInvestment(data: InvestmentData): CalculationResults {
  const { initialAmount, annualcontribution, expectedReturn, duration } = data;

  if (initialAmount < 0) {
    return "Initial amount must be at least zero.";
  }

  if (duration <= 0) {
    return "No valid amout of years provided";
  }

  if (expectedReturn < 0) {
    return "expected return must be at least zero";
  }

  let total = initialAmount;
  let totalContributions = 0;
  let totalIntersedEarned = 0;

  const annualResults: InvestementResults[] = [];

  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn);
    totalIntersedEarned = total - totalContributions - initialAmount;
    totalContributions = totalContributions + annualcontribution;
    total = total + annualcontribution;

    annualResults.push({
      year: `Year ${!+1}`,
      totalAmount: total,
      totalIntersedEarned,
      totalContributions,
    });
  }

  return annualResults;
}

function printResult(results: CalculationResults) {
  if (typeof results === "string") {
    console.log(results);
    return;
  }

  for (const yearEndResults of results) {
    console.log(yearEndResults.year);
    console.log(`Total ${yearEndResults.totalAmount.toFixed(0)}`);
    console.log(`Total Contribution ${yearEndResults.totalContributions.toFixed(0)}`);
    console.log(`Total interest Earned ${yearEndResults.totalIntersedEarned.toFixed(0)}`);
    console.log("----------------")
  }
}
    


const investmentData: InvestmentData = {
    initialAmount : 5000,
    annualcontribution:500,
    expectedReturn:0.88,
    duration:10,

}

const results = calculateInvestment(investmentData);

printResult(results);