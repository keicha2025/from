function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    
    // 獲取所有欄位名稱 (對應 index.html 的 formData 結構)
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var newRow = headers.map(function(header) {
      // 處理複選框陣列轉字串
      var val = data[header] || "";
      if (Array.isArray(val)) {
        return val.join(", ");
      }
      return val;
    });
    
    sheet.appendRow(newRow);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 處理複選框與特殊欄位的輔助說明：
 * 欄位標題建議手動設定為：
 * timestamp, orgName, contact, purpose, targetAudience, pages, otherPage, dataNeeds, stylePref, assets, budget, launchDateValue
 */
