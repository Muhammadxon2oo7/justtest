import jsPDF from 'jspdf';

export function generatePDFReport(analysis: any) {
  const doc = new jsPDF();
  let yPosition = 20;

  // Title
  doc.setFontSize(18);
  doc.text('O\'zbekiston Hududiy Tengsizlik Tahlili', 10, yPosition);
  yPosition += 15;

  // Summary Section
  doc.setFontSize(14);
  doc.text('Qisqacha Ma\'lumot', 10, yPosition);
  yPosition += 8;

  doc.setFontSize(11);
  doc.text(`Yil: ${analysis.data?.year || 'N/A'}`, 10, yPosition);
  yPosition += 6;
  doc.text(`Tumanlar: ${analysis.data?.ranking?.length || 0}`, 10, yPosition);
  yPosition += 6;
  doc.text(`Klasterlar: ${analysis.data?.clustering?.clusters?.size || 0}`, 10, yPosition);
  yPosition += 12;

  // Inequality Metrics
  doc.setFontSize(14);
  doc.text('Tengsizlik Ko\'rsatkichlari', 10, yPosition);
  yPosition += 8;

  if (analysis.data?.inequality) {
    const metrics = analysis.data.inequality[0];
    if (metrics) {
      doc.setFontSize(11);
      doc.text(`Gini: ${metrics.gini?.toFixed(4) || 'N/A'}`, 10, yPosition);
      yPosition += 6;
      doc.text(`CV: ${metrics.cv?.toFixed(2) || 'N/A'}%`, 10, yPosition);
      yPosition += 6;
      doc.text(`Theil: ${metrics.theil?.toFixed(4) || 'N/A'}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Decil: ${metrics.decileRatio?.toFixed(2) || 'N/A'}`, 10, yPosition);
      yPosition += 12;
    }
  }

  // Top Districts
  doc.setFontSize(14);
  doc.text('Eng Yuqori Reyting Tumanlar', 10, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  const topDistricts = analysis.data?.ranking?.slice(0, 5) || [];
  topDistricts.forEach((district: any, idx: number) => {
    doc.text(`${idx + 1}. ${district.name}: ${district.index?.toFixed(3) || 'N/A'}`, 10, yPosition);
    yPosition += 6;
  });

  doc.save('regional-analysis-report.pdf');
}

export function generateCSVReport(analysis: any): string {
  let csv = 'Tahlil Natijalari\n';
  csv += `Yil,${analysis.data?.year || 'N/A'}\n`;
  csv += `Tumanlar,${analysis.data?.ranking?.length || 0}\n\n`;

  csv += 'Tumanlar Reytingli\n';
  csv += 'Reyting,Tuman,Indeksi\n';

  const ranking = analysis.data?.ranking || [];
  ranking.forEach((r: any, i: number) => {
    csv += `${i + 1},"${r.name}",${r.index?.toFixed(4) || 0}\n`;
  });

  return csv;
}

export function downloadReport(analysis: any, format: 'pdf' | 'csv' = 'pdf') {
  if (format === 'pdf') {
    generatePDFReport(analysis);
  } else if (format === 'csv') {
    const csv = generateCSVReport(analysis);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'regional-analysis.csv';
    a.click();
  }
}
