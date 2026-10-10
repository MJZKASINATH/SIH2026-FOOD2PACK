# FOOD2PACK: AI-Based Intelligent Food Packaging Material Recommendation System

> **Smart India Hackathon 2026 Project**  
> **Problem Statement ID:** SIH26236  
> **Theme:** Agriculture, FoodTech & Rural Development  
> **Category:** Software  
> **Team ID:** 155684  
> **Team Name:** TrustUs  

---

## 🎯 Core Product Positioning & Tagline

> **Tagline:** *"Design the package for the journey, not just the product."*  
> **Scientific Principle:** *"AI proposes. Scientific constraints protect. Evidence validates."*  

**FOOD2PACK** is an evidence-backed food-packaging decision-support platform designed to solve the critical postharvest loss challenge in agricultural supply chains. The application evaluates packaging material suitability by analyzing **BOTH**:
1. **FOOD PHYSICAL CHARACTERISTICS** (Respiration dynamics, moisture %, pH level, transpiration constant, fat content)
2. **JOURNEY & TRANSPORT CONDITIONS** (Ambient temperature spikes, relative humidity exposure, transport duration, storage regimes)

> ⚠️ **Decision-Support Notice:** FOOD2PACK is a decision-support system. It does not replace laboratory physical testing, expert packaging validation, or regulatory approval. All predictions without real-world laboratory training data are explicitly labeled as *"Prototype prediction model"*.

---

## 🏛️ System Architecture

The project is built as a full-stack, modular web application:

```
FOOD + JOURNEY
       ↓
EVIDENCE + SCIENCE (FAO / ASTM / FSSAI Database)
       ↓
SCIENTIFIC CONSTRAINTS (OTR / WVTR Boundary Checks)
       ↓
PREDICTIVE ML (Prototype Prediction Engine)
       ↓
MULTI-OBJECTIVE OPTIMIZATION (Pareto Frontier Utility Solver)
       ↓
EXPLAINABLE PACKAGING RECOMMENDATION & EVIDENCE PASSPORT
       ↓
JOURNEY STRESS TEST (Packaging Digital Twin / What-If Simulator)
```

```
c:\Users\Jeevan A Jacob\Desktop\sih\FOOD2PACK
├── backend/
│   ├── main.py              # FastAPI application with REST endpoints & CORS middleware
│   ├── models.py            # Pydantic data schemas for requests, responses & specifications
│   ├── knowledge_db.py      # Curated postharvest food profiles, polymer candidates & evidence database
│   └── engine.py            # Scientific constraint evaluator, multi-objective optimizer & stress tester
└── frontend/
    ├── src/
    │   ├── App.tsx          # Main layout switcher, tab routing & state manager
    │   ├── api.ts           # REST API client with local fallback client
    │   ├── types.ts         # TypeScript interface definitions
    │   └── components/
    │       ├── Sidebar.tsx  # Desktop left navigation bar with project metadata
    │       ├── Header.tsx   # Top navigation bar with active tab indicators
    │       ├── LandingPage.tsx        # Hero section, simplified technical pipeline & feature cards
    │       ├── DashboardPage.tsx      # Stats dashboard & quick commodity demo launchers
    │       ├── NewAssessmentWizard.tsx# 4-step packaging assessment wizard & animated pipeline
    │       ├── RecommendationPage.tsx # Technical specifications, WHY THIS RECOMMENDATION & EVIDENCE PASSPORT
    │       ├── StressTestPage.tsx     # Hero feature: Packaging Digital Twin / What-If simulator
    │       ├── KnowledgeBasePage.tsx  # Searchable evidence ledger with category filters
    │       ├── PackagingMaterialsPage.tsx# Materials catalog with side-by-side comparison modal
    │       ├── AssessmentHistoryPage.tsx # Historical evaluation session logs
    │       ├── MethodologyPage.tsx    # 8-stage methodology visual pipeline
    │       └── AboutModal.tsx         # SIH project details & team info modal
```

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Recharts
- **Backend:** Python 3.11, FastAPI, Pydantic v2, Scikit-learn, Uvicorn
- **API Protocol:** REST API (JSON) with local fallback support

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.9+)

### 1. Run Backend Server (FastAPI)
```bash
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The FastAPI interactive documentation will be available at: `http://127.0.0.1:8000/docs`.

### 2. Run Frontend Server (Vite)
```bash
cd frontend
npm install
npm run dev -- --port 5173
```
Open your browser and navigate to: `http://127.0.0.1:5173`.

---

## 🔬 How the Recommendation Engine Works

1. **Food Fingerprint Construction:** Extracts food physical parameters (e.g. Tomato: 94.5% moisture, Active Climacteric respiration).
2. **Scientific Constraint Evaluation:** Checks candidate polymers against mandatory physical constraints (e.g. active respiring produce requires permeable film with $OTR > 10 \text{ cc/m}^2/\text{day}$ to prevent anaerobic fermentation).
3. **Multi-Objective Optimization:** Evaluates candidate score across 4 weighted objectives:
   $$\text{Utility} = (S_{\text{protection}} \cdot w_1) + (S_{\text{cost}} \cdot w_2) + (S_{\text{efficiency}} \cdot w_3) + (S_{\text{sustainability}} \cdot w_4)$$
4. **Evidence Passport Generation:** Attaches peer-reviewed citations (FAO, ASTM, FSSAI) to provide 100% transparent auditability.

---

## 🧪 Journey Stress Test (Packaging Digital Twin)

The **Journey Stress Test** simulates what happens to a packaging recommendation when transport parameters change:
- **Temperature Spikes:** Recalculates oxygen transmission acceleration using Arrhenius kinetics:
  $$OTR(T) = OTR_{\text{ref}} \cdot 2^{(T - T_{\text{ref}})/10}$$
- **Relative Humidity Exposure:** Evaluates dew-point condensation risks inside unvented films.
- **Quality Decay Kinetics:** Computes real-time quality retention curves ($Q(t) = 100 \cdot e^{-k \cdot t}$) comparing baseline journey vs. stressed journey over transit days.

---

## 📑 REST API Documentation

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Root system health and SIH project metadata |
| `/api/foods` | GET | List available food commodity profiles |
| `/api/foods/{name}` | GET | Get specific commodity properties |
| `/api/materials` | GET | Fetch packaging candidate catalog |
| `/api/evidence` | GET | Query searchable evidence ledger |
| `/api/assessment` | POST | Compute full packaging recommendation & evidence passport |
| `/api/stress-test` | POST | Execute Digital Twin Journey Stress Test simulation |
| `/api/assessments` | GET | Retrieve saved assessment history |
| `/api/methodology` | GET | Retrieve 8-stage methodology documentation |

---

## 🏆 Smart India Hackathon Jury Presentation Highlights

1. **Problem Clarity:** Solves postharvest produce loss by matching packaging to both food science & journey environmental stresses.
2. **Evidence-Backed:** Every recommendation is backed by an **Evidence Passport** linked to peer-reviewed data.
3. **Packaging Digital Twin:** Interactive **Journey Stress Test** demonstrates how temperature abuse or transport delays shift risk profiles and packaging requirements.
4. **Transparent & Honest:** Explicitly distinguishes prototype predictions from laboratory-validated data, enforcing true engineering credibility.
