/**
 * 初始化試算表欄位標題 (Initialization script)
 * 請在 Google Apps Script 編輯器執行此函數一次
 */
function initSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  
  // 定義與前端 formData 相對應的欄位 Key
  var headers = [
    "timestamp", 
    "orgName", 
    "contact", 
    "purpose", 
    "targetAudience", 
    "pages", 
    "otherPage", 
    "dataNeeds", 
    "stylePref", 
    "assets", 
    "budget", 
    "launchDateValue"
  ];
  
  // 清除並設定標題
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // 美化標題列
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#4a6161")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");
    
  // 凍結第一列
  sheet.setFrozenRows(1);
  
  Logger.log("試算表初始化完成！欄位標題已設定。");
}
