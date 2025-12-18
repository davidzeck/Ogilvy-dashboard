/**
 * Download Helpers
 * Utilities for downloading charts as images and Excel files
 */

/**
 * Download component as JPEG image using html2canvas
 * @param elementId - The ID of the element to capture
 * @param filename - The desired filename (without extension)
 */
export const downloadAsJPEG = async (elementId: string, filename: string = 'chart'): Promise<void> => {
  try {
    // Dynamically import html2canvas to reduce initial bundle size
    const html2canvas = (await import('html2canvas')).default;

    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }

    // Capture the element
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
    });

    // Convert to JPEG and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, 'image/jpeg', 0.95);
  } catch (error) {
    console.error('Error downloading JPEG:', error);
    alert('Failed to download image. Please try again.');
  }
};

/**
 * Download data as Excel file
 * @param data - Array of objects to export
 * @param filename - The desired filename (without extension)
 * @param sheetName - The name of the Excel sheet
 */
export const downloadAsExcel = async (
  data: Record<string, any>[],
  filename: string = 'data',
  sheetName: string = 'Sheet1'
): Promise<void> => {
  try {
    // Dynamically import xlsx to reduce initial bundle size
    const XLSX = await import('xlsx');

    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Download file
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  } catch (error) {
    console.error('Error downloading Excel:', error);
    alert('Failed to download Excel file. Please try again.');
  }
};

/**
 * Format agent performance data for Excel export
 */
export const formatAgentPerformanceForExcel = (data: any[]): Record<string, any>[] => {
  return data.map((agent, index) => ({
    'Rank': index + 1,
    'Agent Name': agent.agentName || agent.name,
    'Agent ID': agent.agentId || agent.id,
    'Revenue (KES)': agent.revenue,
    'Leads': agent.leads,
    'Conversion Rate (%)': agent.conversionRate,
    'Turn Around Time (days)': agent.turnAroundTime,
  }));
};

/**
 * Format lead status data for Excel export
 */
export const formatLeadStatusForExcel = (data: any[]): Record<string, any>[] => {
  return data.map((item) => ({
    'Status': item.status,
    'Count': item.count,
    'Percentage (%)': item.percentage || ((item.count / data.reduce((sum, i) => sum + i.count, 0)) * 100).toFixed(2),
  }));
};

/**
 * Format branch ranking data for Excel export
 */
export const formatBranchRankingForExcel = (data: any[]): Record<string, any>[] => {
  return data.map((item, index) => ({
    'Rank': index + 1,
    'Agent Name': item.agentName,
    'Target (KES)': item.target,
    'Realised (KES)': item.realised,
    'Achievement (%)': ((item.realised / item.target) * 100).toFixed(2),
  }));
};
