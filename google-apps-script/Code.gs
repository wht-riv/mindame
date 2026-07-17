function importMindameData() {
  const props = PropertiesService.getScriptProperties();
  const url = props.getProperty('SUPABASE_URL');
  const serviceKey = props.getProperty('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) throw new Error('Script Propertiesを設定してください');
  const response = UrlFetchApp.fetch(url + '/rest/v1/research_export?select=*', {
    headers: { apikey: serviceKey, Authorization: 'Bearer ' + serviceKey },
    muteHttpExceptions: true
  });
  if (response.getResponseCode() !== 200) throw new Error(response.getContentText());
  const rows = JSON.parse(response.getContentText());
  const sheet = SpreadsheetApp.getActive().getSheetByName('日次記録') || SpreadsheetApp.getActive().insertSheet('日次記録');
  const headers = ['anonymous_id','record_date','category','minimum_action','predicted_excuse_text','result_type','action_score','prediction_matched','actual_excuse_text','recorded_next_day','created_at','result_recorded_at'];
  sheet.clearContents();
  sheet.getRange(1,1,1,headers.length).setValues([headers]);
  if (rows.length) sheet.getRange(2,1,rows.length,headers.length).setValues(rows.map(r=>headers.map(h=>r[h] ?? '')));
}
