export const exportToExcel = async (items, fieldLabels, fieldNames) => {
  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Serial numbers");
  worksheet.addTable({
    name: "SerialNumbers",
    ref: "A1",
    columns: fieldLabels.map((fieldLabel) => ({ name: fieldLabel })),
    rows: items.map((item) => fieldNames.map((fieldName) => item[fieldName])),
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const { saveAs } = await import("file-saver");
  const blob = new Blob([buffer]);
  saveAs(blob, `export-${new Date().toISOString()}.xlsx`);
};
