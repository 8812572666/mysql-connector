@echo off
REM 替换下面的TOKEN为你从DuckDNS网站获取的token值
SET domain=cxfapp
SET token=YOUR_TOKEN_HERE

:loop
echo Updating DuckDNS...
curl "https://www.duckdns.org/update?domains=%domain%&token=%token%&ip="
timeout /t 300
goto loop 