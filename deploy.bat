@echo off
chcp 65001 >nul
echo ====================================
echo    GitHub Pages 자동 배포 시작
echo ====================================
echo.

echo [1/3] 변경사항 스테이징 중...
git add .
if errorlevel 1 (
    echo ❌ 오류: 파일 추가 실패
    pause
    exit /b 1
)
echo ✅ 완료

echo.
echo [2/3] 커밋 중...
git commit -m "Update: %date% %time%"
if errorlevel 1 (
    echo ⚠️  변경사항이 없거나 커밋 실패
    echo    (변경사항이 없으면 정상입니다)
)
echo ✅ 완료

echo.
echo [3/3] GitHub에 푸시 중...
git push
if errorlevel 1 (
    echo ❌ 오류: 푸시 실패
    echo    인터넷 연결 또는 권한을 확인하세요
    pause
    exit /b 1
)
echo ✅ 완료

echo.
echo ====================================
echo    🎉 배포 완료!
echo ====================================
echo.
echo 📍 GitHub 저장소에 업로드되었습니다.
echo ⏱️  1-3분 후 GitHub Pages에 반영됩니다.
echo.
echo 배포 사이트: https://srt-gt4065b.github.io/wsu-gimbap/
echo.
pause