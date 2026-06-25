@echo off
cd /d "%~dp0"
set "PATH=C:\Users\4G TRADERS\.node\node-v22.13.0-win-x64;%PATH%"
npm.cmd run dev -- --host 127.0.0.1 --port 3000 > "%~dp0vite-dev.log" 2> "%~dp0vite-dev.err.log"
