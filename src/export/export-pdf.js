import 'jspdf-autotable';

import jsPDF from 'jspdf';

const exportToPDF = (head, body) {
    const doc: any = new jsPDF(orientation);

    doc.autoTable({
      margin: 1,
      headStyles: { fillColor: '#F1F5F7', textColor: '#747D86' },
      alternateRowStyles: { fillColor: '#F9FBFC' },
      head,
      body,
    })   

    doc.save('table.pdf')
}

export const exportTableToPDF = (tableProps) => {
    const head = [tableProps.columns.map(c => c.title)];
    const body = tableProps.data!.map(d => tableProps.columns.map(c => getValueByColumn(d, c)));

    exportToPdf(head, body);
}
