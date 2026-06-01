# Deep Hedging with CVaR Optimization

> A quantitative finance project that combines Black-Scholes theory, synthetic market simulation, deep learning, and risk-aware optimization to learn hedging strategies for options portfolios.

---

## Project Overview

Traditional option hedging relies on Black-Scholes Delta Hedging.

While effective in theory, real markets contain:

* Transaction Costs
* Volatility Shocks
* Market Crashes
* Gap Events
* Extreme Tail Risks

This project investigates whether a Deep Hedger can learn hedge positions that remain robust under these realistic conditions.

The objective is not to predict stock prices.

The objective is to learn a hedging policy that minimizes portfolio risk.

---

## Key Features

### Market Data Layer

* Real NIFTY Futures Data
* Real NIFTY Options Data
* Implied Volatility Estimation

### Quantitative Finance Layer

* Black-Scholes Pricing
* Delta
* Gamma
* Theta
* Delta Hedging Benchmark

### Simulation Layer

* Geometric Brownian Motion (GBM)
* Synthetic Market Generation
* Multi-Path Monte Carlo Simulation

### Deep Learning Layer

* Deep Hedger Neural Network
* Learned Hedge Positions
* State-Based Hedging Decisions

### Risk Optimization Layer

* Value at Risk (VaR)
* Conditional Value at Risk (CVaR)

### Realistic Market Layer

* Transaction Cost Modelling
* Cost-Aware Hedging

### Stress Testing Layer

* Market Crash Scenarios
* Gap-Up Scenarios
* Flash Crash Scenarios
* Volatility Explosion Scenarios

---

## Project Workflow

```text
Real Market Data
        ↓
Implied Volatility
        ↓
Greeks
        ↓
Black-Scholes Benchmark
        ↓
GBM Market Simulation
        ↓
Deep Hedger Training
        ↓
CVaR Optimization
        ↓
Transaction Costs
        ↓
Stress Testing
        ↓
Risk Comparison
```

---

## Strategy Comparison

The notebook evaluates:

### No Hedge

Portfolio remains completely exposed to market risk.

### Black-Scholes Hedge

Traditional delta-based hedging strategy.

### Deep Hedger

Neural-network-based hedge policy optimized using CVaR.

---

## Risk Metrics

The following metrics are used:

* Mean PnL
* Standard Deviation
* VaR
* CVaR
* Worst Loss
* Transaction Cost Impact

---

## Stress Testing

Strategies are evaluated under:

* Market Crash
* Flash Crash
* Gap-Up Event
* Volatility Explosion

This helps measure robustness beyond normal market conditions.

---

## Roadmap Status

### Beginner Stage

* Real Market Data
* Black-Scholes
* Greeks
* Implied Volatility
* Delta Hedging

Status: Complete

### Intermediate Stage

* Deep Hedger
* CVaR Optimization
* Transaction Costs
* Stress Testing
* Comparative Evaluation

Status: Complete

### Advanced Stage

Future work includes:

* Adversarial Market Generation
* Robust Hedging
* Advanced Market Regime Simulation

---

## Tech Stack

* Python
* NumPy
* Pandas
* SciPy
* PyTorch
* Matplotlib
* Jupyter Notebook

---

## Repository Structure

```text
Deep-Hedging-CVaR/
│
├── Deep_Hedger.ipynb
├── datasets/
├── README.md
└── LICENSE
```

---

## Research Question

Can a Deep Neural Network learn a hedging strategy that performs better than traditional Black-Scholes hedging under transaction costs and extreme market stress?

This notebook explores that question through simulation, optimization, and comparative risk analysis.

---

## License

MIT License
