# Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
- `CLAUDE_API_KEY` (optional, get from https://console.anthropic.com)
- `DATABASE_URL` (optional, for Prisma)

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to: `http://localhost:3000`

---

## Navigation

### Main Pages

| Page | URL | Purpose |
|------|-----|---------|
| **Home** | `/` | Landing page with project overview |
| **Dashboard** | `/dashboard` | Key metrics and trends dashboard |
| **Data Input** | `/data-input` | Multi-step data entry wizard |
| **Inequality Analysis** | `/analysis/inequality` | Detailed inequality metrics |
| **Clustering** | `/analysis/clustering` | Cluster visualization (2D scatter) |
| **Rankings** | `/analysis/ranking` | Full district rankings with filtering |
| **Comparison** | `/analysis/comparison` | Region-to-region comparison |
| **Recommendations** | `/recommendations` | AI-powered policy recommendations |

---

## Key Features

### 📊 Dashboard
- View regional statistics
- See inequality trends
- Monitor cluster distribution
- Compare top performers

### 📈 Analysis Pages
- **Inequality**: Gini, CV, Theil, Decile Ratio metrics
- **Clustering**: 4-cluster K-means with quality metrics
- **Rankings**: All districts ranked by composite index
- **Comparison**: Compare multiple regions side-by-side

### 🤖 AI Recommendations
- Claude AI-powered policy suggestions
- Cluster-specific recommendations
- Action-oriented implementation plans
- Impact assessment for each recommendation

### 📥 Data Input
- Step 1: Select region
- Step 2: Choose year
- Step 3: Enter indicator values
- Validates all inputs before submission

---

## API Endpoints

### Test the APIs

#### 1. Analyze (Full Analysis)
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      {
        "name": "District 1",
        "regionId": "TAS",
        "indicators": {
          "gdp_per_capita": 2500,
          "literacy_rate": 95
        }
      }
    ],
    "year": 2024
  }'
```

#### 2. Clustering (K-means)
```bash
curl -X POST http://localhost:3000/api/clustering \
  -H "Content-Type: application/json" \
  -d '{"data": [...], "k": 4}'
```

#### 3. Recommendations (AI)
```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"analysis": {...}, "region": "Samarkand"}'
```

---

## Data Structure

### 14 Regions
- Tashkent (TAS)
- Tashkent City (TAS-C)
- Samarkand (SAM)
- Bukhara (BUK)
- Navoi (NAV)
- Kashkadarya (KAS)
- Surkhandarya (SUR)
- Khorezm (KHO)
- Karakalpakstan (KAR)
- Andijan (AND)
- Fergana (FER)
- Namangan (NAM)
- Jizzakh (JIZ)
- Syrdarya (SYR)

### 30+ Indicators

**Economic (8)**
- GDP per capita
- Industry output
- Agriculture output
- Service sector size
- Employment rate
- Small business count
- FDI inflow
- Export value

**Social (8)**
- Literacy rate
- Healthcare access
- Healthcare quality
- School enrollment
- Poverty rate
- Income distribution
- Social services coverage
- Community participation

**Demographic (7)**
- Population density
- Urban percentage
- Population growth
- Birth rate
- Life expectancy
- Gender ratio
- Age distribution

**Infrastructure (8)**
- Road network
- Electricity access
- Water access
- Internet coverage
- Public transport
- Healthcare facilities
- Education facilities
- Market infrastructure

---

## Mathematical Formulas

### Gini Coefficient
$$G = \frac{\sum_{i=1}^{n} (2i - n - 1) y_i}{n \sum_{i=1}^{n} y_i}$$

Where $y_i$ are sorted income values

### Coefficient of Variation
$$CV = \frac{\sigma}{\mu} \times 100$$

Where $\sigma$ is standard deviation and $\mu$ is mean

### Theil Index
$$T = \frac{1}{n} \sum_{i=1}^{n} \frac{y_i}{\bar{y}} \ln\left(\frac{y_i}{\bar{y}}\right)$$

### Decile Ratio
$$DR = \frac{D_{10}}{D_1}$$

Where $D_{10}$ and $D_1$ are 90th and 10th percentiles

---

## Troubleshooting

### Port Already in Use
```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 PID
```

### Missing Dependencies
```bash
npm install --legacy-peer-deps
```

### Build Errors
```bash
rm -rf .next
npm run build
```

### Database Issues
```bash
# Reset Prisma
npx prisma migrate reset

# Seed database
npm run seed
```

---

## Development Tips

### Enable Fast Refresh
Edit `next.config.ts`:
```typescript
module.exports = {
  reactStrictMode: true,
  swcMinify: true
}
```

### Add Console Logging
```typescript
// In API routes
console.log('Analysis started:', data);
```

### Use React DevTools
Install [React DevTools](https://react-devtools-tutorial.vercel.app/) browser extension

### Test API Endpoints
Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/)

---

## File Structure Quick Reference

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/        ← Analysis endpoint
│   │   ├── clustering/     ← Clustering endpoint
│   │   └── recommendations/ ← AI endpoint
│   ├── dashboard/          ← Dashboard page
│   ├── data-input/         ← Data entry
│   ├── analysis/           ← Analysis pages
│   └── recommendations/    ← Recommendations page
├── lib/
│   ├── analytics/          ← Math functions
│   ├── data/               ← Region/indicator data
│   ├── hooks/              ← React hooks
│   └── utils/              ← Utilities
├── components/
│   ├── layout/             ← Navigation
│   ├── dashboard/          ← Dashboard components
│   └── analysis/           ← Analysis components
└── types/
    └── index.ts            ← Type definitions
```

---

## Next Steps

1. **Explore the UI** - Navigate through all pages
2. **Test the APIs** - Use curl or Postman
3. **Input Sample Data** - Use the data input wizard
4. **View Results** - Check analysis pages
5. **Get Recommendations** - Explore AI suggestions
6. **Export Data** - Download CSV/PDF/Excel

---

## Performance Optimization

### Enable Caching
```typescript
// In API routes
res.setHeader('Cache-Control', 'public, max-age=3600');
```

### Optimize Images
```typescript
import Image from 'next/image';

<Image src="/logo.png" width={100} height={100} />
```

### Code Splitting
```typescript
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/components/Chart'), { ssr: false });
```

---

## Common Commands

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Database migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Seed database
npm run seed
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Search (if implemented) |
| `Cmd/Ctrl + /` | Toggle sidebar |
| `Cmd/Ctrl + D` | Open DevTools |
| `F5` | Refresh page |

---

## Documentation Links

- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Docs](https://react.dev)

---

## Support & Community

- 📧 Email: support@example.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions
- 📚 Wiki: Project Wiki

---

## Version Info

| Component | Version |
|-----------|---------|
| Node.js | 18+ |
| Next.js | 14+ |
| React | 19 |
| TypeScript | 5.4+ |
| Tailwind | 4 |

---

## License

This project is provided as-is for educational and policy analysis purposes.

---

**Happy analyzing! 📊**
