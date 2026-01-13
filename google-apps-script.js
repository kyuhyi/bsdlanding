/**
 * BSD 랜딩페이지 - Google Sheets 연동 Apps Script
 * 
 * 시트 ID: 1xs8csdc9a_9yhq3p5V4USBhElCfeOKhdsEEq6LEOvhA
 * 시트 이름: sheet1
 * 
 * === 설치 방법 ===
 * 1. Google Sheets에서 확장 프로그램 > Apps Script 클릭
 * 2. 기존 코드를 삭제하고 이 코드를 붙여넣기
 * 3. 저장 (Ctrl+S)
 * 4. 배포 > 새 배포
 * 5. 유형: 웹 앱
 * 6. 실행할 사용자: 본인 (나)
 * 7. 액세스 권한: 모든 사용자
 * 8. 배포 후 생성된 URL을 복사하여 Contact.tsx의 GOOGLE_SCRIPT_URL에 붙여넣기
 */

// 스프레드시트 ID
const SPREADSHEET_ID = "1xs8csdc9a_9yhq3p5V4USBhElCfeOKhdsEEq6LEOvhA";
const SHEET_NAME = "sheet1";

/**
 * POST 요청 처리 - 폼 데이터를 스프레드시트에 추가
 */
function doPost(e) {
  try {
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    
    // 스프레드시트 열기
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    // 현재 시간 (한국 시간)
    const timestamp = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
    
    // 데이터 추가 (A열: 이름, B열: 전화번호, C열: 이메일, D열: 기타문의, E열: 제출일시)
    sheet.appendRow([
      data.이름 || "",
      data.전화번호 || "",
      data.이메일 || "",
      data.기타문의 || "",
      timestamp
    ]);
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "데이터가 성공적으로 저장되었습니다." 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "error", 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리 - 테스트용
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "ok", 
      message: "BSD Landing Page API is running!" 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 테스트 함수 - Apps Script 에디터에서 직접 실행 가능
 */
function testAppendRow() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const timestamp = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
  
  sheet.appendRow([
    "테스트 이름",
    "010-0000-0000",
    "test@test.com",
    "테스트 문의입니다",
    timestamp
  ]);
  
  Logger.log("테스트 데이터 추가 완료!");
}
