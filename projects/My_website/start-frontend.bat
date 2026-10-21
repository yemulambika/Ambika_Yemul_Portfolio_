@echo off
title Portfolio Frontend :5173
cd /d c:\Users\Admin\Desktop\My_Website\client
if not exist node_modules (
  echo Installing frontend dependencies first...
  npm.cmd install --no-audit --no-fund
)
echo Starting frontend on http://localhost:5173 ...
npm.cmd run dev
pause
