/**
 * 
 * Copy this content into your Google Apps Script project.
 * Ensure you have sheets named '題目' and '回答'.
 */

const SHEET_QUESTIONS = '題目';
const SHEET_ANSWERS = '回答';

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getQuestions') {
    const count = parseInt(e.parameter.count || '5');
    return getQuestions(count);
  }
  
  return responseJSON({ error: 'Invalid action' });
}

function doPost(e) {
  // Parsing post body
  // e.postData.contents is the raw string
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    // If sent as form-data or other format, handle accordingly. 
    // But our frontend sends JSON string as body.
    return responseJSON({ error: 'Invalid JSON' });
  }

  const action = data.action;

  if (action === 'submitScore') {
    return submitScore(data);
  }

  return responseJSON({ error: 'Invalid action' });
}

/**
 * Fetch N random questions from the sheet.
 */
function getQuestions(n) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_QUESTIONS);
  // Assume Row 1 is header. Data starts Row 2.
  // Col 1: ID, Col 2: Question, Col 3: A, Col 4: B, Col 5: C, Col 6: D, Col 7: Answer
  const lastRow = sheet.getLastRow();
  
  if (lastRow < 2) return responseJSON([]);

  const range = sheet.getRange(2, 1, lastRow - 1, 7);
  const values = range.getValues();
  
  // Shuffle and pick N
  const shuffled = values.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, n);
  
  const questions = selected.map(row => ({
    id: row[0],
    question: row[1],
    options: [row[2], row[3], row[4], row[5]],
    answer: row[6] // In a real secure app, we might check answer on server.
                   // But for this game, we send it to client for immediate feedback.
                   // Ideally client shouldn't see it in Network tab easily, but it's okay for this scope.
  }));
  
  return responseJSON(questions);
}

/**
 * Submit score and update user stats.
 */
function submitScore(data) {
  const lock = LockService.getDocumentLock();
  // Wait for up to 10 seconds for other processes to finish.
  try {
    lock.waitLock(10000);
  } catch (e) {
    return responseJSON({ error: 'Server busy. Please try again.' });
  }

  try {
    const { id, score, passed, answers } = data; // answers is optional logs
    console.log('Submitting Score for:', id, 'Score:', score);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_ANSWERS);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_ANSWERS);
      sheet.appendRow(['ID', '闖關次數', '總分', '最高分', '第一次通關分數', '花了幾次通關', '最近遊玩時間']);
    }

    const allData = sheet.getDataRange().getValues();
    // Find user row index (skip header)
    let userRowIndex = -1;
    for (let i = 1; i < allData.length; i++) {
        // Convert to string to be safe
       if (String(allData[i][0]) === String(id)) {
        userRowIndex = i + 1; // 1-based index
        break;
      }
    }

    const now = new Date();

    if (userRowIndex > 0) {
      // Update existing user
      // Cols: 1:ID, 2:Count, 3:TotalScore(Last?), 4:Max, 5:FirstPassScore, 6:AttemptsUntilPass, 7:Time
      const range = sheet.getRange(userRowIndex, 1, 1, 7);
      const row = range.getValues()[0];
      
      let playCount = (row[1] || 0) + 1;
      let currentMax = row[3] || 0;
      let totalScore = (row[2] || 0) + score;
      let newMax = Math.max(currentMax, score);
      
      // "第一次通關分數" & "花了幾次通關"
      let firstPassScore = row[4];
      let attemptsToPass = row[5];
      
      if (passed && !firstPassScore) {
         firstPassScore = score;
         attemptsToPass = playCount;
      }
      
      // Update row
      range.setValues([[id, playCount, totalScore, newMax, firstPassScore, attemptsToPass, now]]);
    } else {
      // New User
      let firstPassScore = passed ? score : '';
      let attemptsToPass = passed ? 1 : '';
      
      // Append
      sheet.appendRow([id, 1, score, score, firstPassScore, attemptsToPass, now]);
    }
    
    console.log('Score saved successfully');
    return responseJSON({ success: true, message: 'Score recorded' });

  } catch (e) {
      console.error('Error in submitScore:', e);
      return responseJSON({ error: e.toString() });
  } finally {
    lock.releaseLock();
  }
}

function responseJSON(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
