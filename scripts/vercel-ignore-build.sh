#!/bin/bash

echo "🔍 Checking if frontend files changed..."

# Check if any files changed in web/ directory (excluding common non-code files)
if git diff --quiet HEAD^ HEAD -- web/ ':!*.md' ':!*.txt' ':!LICENSE'; then
  # No changes in web/ directory
  echo "✅ No frontend changes detected. Skipping build."
  exit 0
else
  # Changes detected in web/ directory
  echo "🚀 Frontend changes detected. Proceeding with build."
  exit 1
fi

