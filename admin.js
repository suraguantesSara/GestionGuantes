function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById("1KMX5bDKcu7JbW7KbPfrYu6iLncbnA3nXDh8EH3t8ww4");
    const hoja = ss.getSheetByName(e.parameter.proceso);
    hoja.appendRow([
      e.parameter.REFERENCIA,
      e.parameter.CANTIDAD,
      new Date(),
      e.parameter.ENVIADO || "",
      e.parameter.DESTINO || ""
    ]);
    return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("ERROR: " + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
