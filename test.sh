#!/bin/bash
echo "Running basic test..."
if [ -f "weatherApp.html" ] && [ -f "script.js" ] && [ -f "style.css" ]; then
	echo "✅️ All files exist.Test Passed"
	exit 0
else
	echo "❌️ Missing one or more files. Test Failed"
	exit 1
fi
