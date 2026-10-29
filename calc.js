// Rajasthan rooftop guide, September bill pattern measured from the public
// MNRE estimate: bill sets the size, sanctioned load does not.
// No network, no camera, no saved data.

const SIZE_AT_BILL = [
  [500, 1],
  [600, 1.5],
  [900, 2],
  [1200, 2.5],
  [1600, 3],
  [1900, 3.5],
  [2200, 4],
  [2500, 4.5],
  [2900, 5],
  [3200, 5.5],
  [3500, 6],
  [3900, 6.5],
  [4200, 7],
  [4500, 7.5],
  [4900, 8],
  [5200, 8.5],
  [5500, 9],
  [5900, 9.5],
  [6200, 10],
  [6500, 10.5],
  [6800, 11],
  [7200, 11.5],
  [7500, 12],
  [7800, 12.5],
  [8200, 13],
  [8500, 13.5],
  [8800, 14],
  [9200, 14.5],
  [9500, 15],
  [9800, 15.5],
];

const YIELD = 1569.375;

function sizeForBill(bill) {
  let kw = 1;
  for (const [minBill, size] of SIZE_AT_BILL) {
    if (bill >= minBill) kw = size;
  }
  return kw;
}

function ratePerKw(kw) {
  if (kw <= 3) return 70000;
  if (kw <= 5) return 60000;
  if (kw <= 10) return 55000;
  return 50000;
}

function centralSubsidy(kw) {
  if (kw <= 2) return Math.round(kw * 30000);
  if (kw <= 3) return Math.round(60000 + (kw - 2) * 18000);
  return 78000;
}

function rajasthanSubsidy(kw) {
  return kw <= 5 ? 17000 : 0;
}

function estimate(bill) {
  const kw = sizeForBill(bill);
  const rate = ratePerKw(kw);
  const gross = Math.round(rate * kw);
  const central = centralSubsidy(kw);
  const state = rajasthanSubsidy(kw);
  const net = gross - central - state;
  return {
    kw,
    rate,
    gross,
    central,
    state,
    subsidy: central + state,
    net,
    generation: Math.round(kw * YIELD),
    payback: net / (bill * 12),
  };
}
