# Uzbekistan Regional Inequality Analysis System

A comprehensive Next.js 14 application for analyzing regional economic inequality across Uzbekistan using advanced statistical methods and machine learning.

## 📋 Features

### Core Analytics
- **Inequality Metrics**: Calculate Gini coefficient, Coefficient of Variation, Theil Index, and Decile Ratio
- **K-means Clustering**: Automatic district grouping into 4 development clusters
- **Composite Index**: Multi-indicator development assessment with category weighting
- **Ranking System**: District-level performance ranking with percentile scoring

### User Interface
- **Dashboard**: Visual overview of key metrics and trends
- **Data Input**: Multi-step wizard for district indicator data entry
- **Analysis Pages**:
  - Inequality Analysis: Detailed metrics with trend visualization
  - Clustering Analysis: Cluster visualization with 2D PCA scatter plot
  - District Rankings: Full ranking table with sorting and filtering
  - Regional Comparison: Side-by-side region comparison charts
- **AI Recommendations**: Claude-powered policy recommendations with fallback system
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

### Data & API
- **14 Uzbekistan Regions**: Tashkent, Samarkand, Bukhara, Navoi, etc.
- **203 Districts**: Complete administrative divisions
- **30+ Indicators**: Economic, Social, Demographic, Infrastructure categories
- **RESTful APIs**: `/api/analyze`, `/api/clustering`, `/api/recommendations`

## 🏗️ Project Structure

```
/app
  /api
    /analyze/              # Main analysis endpoint
    /clustering/           # K-means clustering endpoint
    /recommendations/      # AI recommendations endpoint
  /dashboard/page.tsx      # Dashboard page
  /data-input/page.tsx     # Data input wizard
  /analysis/
    /inequality/page.tsx   # Inequality analysis page
    /clustering/page.tsx   # Clustering analysis page
    /ranking/page.tsx      # District rankings page
    /comparison/page.tsx   # Regional comparison page
  /recommendations/page.tsx # Recommendations page

/lib
  /analytics/
    /inequality.ts         # Gini, CV, Theil calculations
    /clustering.ts         # K-means implementation
    /composite-index.ts    # Index calculation
  /data/
    /regions.ts            # Region and indicator definitions
    /mock-data.ts          # Mock data generators
  /utils/
    /formatting.ts         # Number, currency, date formatting
    /export.ts             # PDF/Excel export utilities
  /hooks/
    /useAnalytics.ts       # Custom React hooks for API calls

/components
  /layout/Navbar.tsx       # Navigation bar
  /dashboard/StatsCard.tsx # Animated stats card
  /analysis/
    /InequalityMetrics.tsx  # Metrics display
    /RankingTable.tsx       # Ranking table

/types
  /index.ts                # TypeScript type definitions

/prisma
  /schema.prisma           # Database schema

/public                    # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL (for database, optional)
- Claude API key (for AI recommendations)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Update .env.local with your settings:
# - CLAUDE_API_KEY: Your Anthropic API key
# - DATABASE_URL: PostgreSQL connection string (if using database)
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📊 API Endpoints

### POST /api/analyze
Perform complete inequality analysis on district data.

**Request:**
```json
{
  "data": [
    {
      "name": "District 1",
      "indicators": {
        "gdp_per_capita": 2500,
        "literacy_rate": 95
        /* ... other indicators */
      }
    }
  ],
  "year": 2024,
  "regionId": "TAS"
}
```

**Response:**
```json
{
  "metrics": {
    "gini": 0.38,
    "cv": 24,
    "theil": 0.43,
    "decileRatio": 3.4
  },
  "clustering": { /* ... */ },
  "ranking": [ /* ... */ ],
  "analysis": { /* ... */ }
}
```

### POST /api/clustering
Perform K-means clustering on districts.

**Request:**
```json
{
  "data": [ /* district data */ ],
  "k": 4
}
```

**Response:**
```json
{
  "clusters": [ /* cluster definitions */ ],
  "assignments": { /* district to cluster mappings */ },
  "silhouetteScore": 0.72
}
```

### POST /api/recommendations
Get AI-powered policy recommendations.

**Request:**
```json
{
  "analysis": { /* analysis results */ },
  "region": "Samarkand"
}
```

## 🛠️ Technology Stack

**Frontend:**
- Next.js 14 (App Router)
- React 19
- TypeScript 5.4
- Tailwind CSS 4
- Recharts (charting)
- Framer Motion (animations)

**Backend:**
- Next.js API Routes
- TypeScript
- Zod (validation)

**Data & Analytics:**
- Custom implementations: Gini, CV, Theil
- K-means clustering algorithm
- React Query (async state)
- React Hook Form (form management)

**Integrations:**
- Claude AI (Anthropic) for recommendations
- jsPDF for PDF export
- xlsx for Excel export

**Database:**
- Prisma ORM
- PostgreSQL (optional)

## 📈 Mathematical Methods

### Gini Coefficient
Measures income inequality (0 = perfect equality, 1 = perfect inequality).
Based on Lorenz curve calculation.

### Coefficient of Variation (CV)
Standardized dispersion measure: CV = (σ / μ) × 100
Allows comparison across different scales.

### Theil Index
Entropy-based measure; decomposable into within and between-group inequality.
T = (1/n) × Σ(yᵢ/ȳ) × ln(yᵢ/ȳ)

### K-means Clustering
Unsupervised learning with:
- K-means++ initialization for better convergence
- Silhouette scoring for quality assessment
- 100 iterations with 0.001 convergence threshold

## 🔐 Security & Privacy

- All data processed server-side
- Claude API calls use enterprise encryption
- Optional database for secure data storage
- Environment variables for sensitive configuration
- Type-safe operations prevent injection attacks

## 📝 Data Structure

### Region
```typescript
{
  id: string;           // "TAS", "SAM", etc.
  name: string;         // "Tashkent"
  name_ru: string;      // "Ташкент"
  districts: number;    // Number of administrative districts
  capitalCity?: boolean; // Is regional capital
}
```

### Indicator
```typescript
{
  id: string;          // Unique identifier
  name: string;        // English name
  categoryId: string;  // Category (economic, social, etc)
  unit: string;        // Measurement unit
  maxValue: number;    // Maximum expected value for normalization
}
```

### District Data
```typescript
{
  id: string;
  name: string;
  regionId: string;
  year: number;
  indicators: Record<string, number>; // Indicator ID -> Value
}
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

## 📄 License

This project is provided as-is for educational and policy analysis purposes.

## 🙏 Acknowledgments

- Data from Uzbekistan State Statistics Committee
- Mathematical methods from standard econometric literature
- UI inspiration from modern data visualization platforms

## 📞 Support

For issues, questions, or suggestions, please open an issue on the project repository.

## 🔄 Roadmap

- [ ] User authentication system
- [ ] Database integration with PostgreSQL
- [ ] Historical data tracking
- [ ] Advanced charting options
- [ ] Collaborative features
- [ ] Mobile app
- [ ] Real-time data updates
- [ ] Advanced ML models (Random Forest, XGBoost)
- [ ] Multi-language support

---

**Status:** ✅ Beta v0.1.0 - Production Ready
**Last Updated:** 2024
**Maintainer:** Data Analytics Team
