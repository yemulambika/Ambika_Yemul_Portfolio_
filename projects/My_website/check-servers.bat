@echo off
echo === Backend :5000 ===
curl -m 5 -s http://localhost:5000/api/health
echo.
echo === Frontend :5173 ===
curl -m 5 -s -o NUL -w "HTTP %%{http_code}\n" http://localhost:5173/
pause
