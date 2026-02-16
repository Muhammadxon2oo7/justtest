import { NextResponse } from 'next/server';
import { Recommendation } from '@/types';

// Mock recommendations if API key not available
const MOCK_RECOMMENDATIONS: Record<string, Recommendation[]> = {
  '1': [
    {
      id: '1',
      action: 'Diversify economic base beyond primary sectors',
      expectedResult: 'Increase GDP growth rate by 2-3% annually',
      timeline: 'medium',
      budgetEstimate: 'high',
      priority: 'critical',
      category: 'economic',
      successMetrics: ['GDP growth rate increase', 'New industries created', 'Job creation'],
      implementationSteps: ['Conduct economic assessment', 'Identify growth sectors', 'Develop incentive programs'],
      riskFactors: ['Market competition', 'Regulatory changes'],
      bestPractices: ['Study Singapore model', 'Learn from Dubai']
    },
    {
      id: '2',
      action: 'Invest in infrastructure development',
      expectedResult: 'Improve logistics and connectivity by 40%',
      timeline: 'long',
      budgetEstimate: 'high',
      priority: 'high',
      category: 'infrastructure',
      successMetrics: ['Road completion rate', 'Transport efficiency', 'Cost reduction'],
      implementationSteps: ['Survey transportation needs', 'Design infrastructure plan', 'Execute construction'],
      riskFactors: ['Budget constraints', 'Weather delays'],
      bestPractices: ['PPP models', 'International standards']
    },
    {
      id: '3',
      action: 'Enhance human capital through education and training',
      expectedResult: 'Increase workforce productivity by 25%',
      timeline: 'long',
      budgetEstimate: 'medium',
      priority: 'high',
      category: 'social',
      successMetrics: ['Education level increase', 'Skill certification rate', 'Employment rate'],
      implementationSteps: ['Needs assessment', 'Curriculum development', 'Teacher training'],
      riskFactors: ['Teacher shortage', 'Student dropout'],
      bestPractices: ['Online learning integration', 'Industry partnerships']
    }
  ],
  '2': [
    {
      id: '1',
      action: 'Support SME development programs',
      expectedResult: 'Create 500+ new small businesses',
      timeline: 'short',
      budgetEstimate: 'medium',
      priority: 'high',
      category: 'economic',
      successMetrics: ['Business registrations', 'Employment created', 'Revenue generated'],
      implementationSteps: ['Simplify registration', 'Provide financing', 'Business training'],
      riskFactors: ['Market saturation', 'Low capital'],
      bestPractices: ['Microfinance approach', 'Incubators']
    }
  ],
  '3': [
    {
      id: '1',
      action: 'Focus on poverty reduction programs',
      expectedResult: 'Reduce poverty rate by 15% over 3 years',
      timeline: 'medium',
      budgetEstimate: 'high',
      priority: 'critical',
      category: 'social',
      successMetrics: ['Income level increase', 'Poverty rate reduction', 'Living standard improvement'],
      implementationSteps: ['Target population identification', 'Cash transfer programs', 'Job creation'],
      riskFactors: ['Inflation', 'Budget constraints'],
      bestPractices: ['Conditional cash transfers', 'Direct support programs']
    }
  ],
  '4': [
    {
      id: '1',
      action: 'Agriculture modernization initiative',
      expectedResult: 'Increase agricultural productivity by 30%',
      timeline: 'medium',
      budgetEstimate: 'medium',
      priority: 'high',
      category: 'economic',
      successMetrics: ['Yield increase', 'Farmer income growth', 'Technology adoption'],
      implementationSteps: ['Training programs', 'Technology distribution', 'Market linkage'],
      riskFactors: ['Climate variability', 'Water scarcity'],
      bestPractices: ['Precision farming', 'Cooperative models']
    }
  ]
};

export async function POST(request: Request) {
  try {
    const { regionId, cluster, indicators } = await request.json();

    if (!regionId || !cluster) {
      return NextResponse.json(
        { success: false, error: 'regionId and cluster are required' },
        { status: 400 }
      );
    }

    // Try to use Claude API if available
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const recommendations = await generateWithClaude(regionId, cluster, indicators);
        return NextResponse.json({
          success: true,
          data: {
            regionId,
            cluster,
            recommendations,
            source: 'claude',
            generatedAt: new Date().toISOString()
          }
        });
      } catch (claudeError) {
        console.warn('Claude API error, using mock recommendations:', claudeError);
      }
    }

    // Use mock recommendations as fallback
    const recommendations = MOCK_RECOMMENDATIONS[String(cluster)] || MOCK_RECOMMENDATIONS['2'];

    return NextResponse.json({
      success: true,
      data: {
        regionId,
        cluster,
        recommendations,
        source: 'mock',
        generatedAt: new Date().toISOString(),
        note: 'Using mock recommendations. Configure ANTHROPIC_API_KEY for AI-generated recommendations.'
      }
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to generate recommendations', message: errorMessage },
      { status: 500 }
    );
  }
}

async function generateWithClaude(regionId: string, cluster: number, indicators: any): Promise<Recommendation[]> {
  const clusterDescriptions: Record<number, string> = {
    1: 'High development - Focus on innovation and quality improvement',
    2: 'Medium-high development - Build on strengths and address gaps',
    3: 'Medium-low development - Need targeted support',
    4: 'Low development - Priority intervention required'
  };

  const prompt = `You are an expert in regional development policy for Uzbekistan.
  
Region: ${regionId}
Development Level: ${clusterDescriptions[cluster]}
Current Indicators: ${JSON.stringify(indicators, null, 2)}

Generate 10-15 specific, actionable policy recommendations for this region.
Format each recommendation as JSON with these fields:
- action: Specific policy action
- expectedResult: Quantifiable outcome
- timeline: 'short' (1-2 years), 'medium' (3-5 years), or 'long' (5+ years)
- budgetEstimate: 'low' (<\$5M), 'medium' (\$5-20M), or 'high' (>\$20M)
- priority: 'critical', 'high', 'medium', or 'low'
- category: 'economic', 'social', 'infrastructure', or 'demographic'
- successMetrics: Array of measurement metrics
- implementationSteps: Array of steps
- riskFactors: Array of potential risks
- bestPractices: Array of best practices from other regions

Return as JSON array only, no other text.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.content[0]?.text || '[]';

  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return MOCK_RECOMMENDATIONS[String(cluster)] || [];
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Recommendations API - POST regionId, cluster, and indicators for recommendations'
  });
}
