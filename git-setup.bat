@echo off
REM Git Deployment Setup Script for Windows

echo Setting up Git deployment configuration...

REM Check if we're in a git repository
if not exist .git (
    echo Error: Not in a git repository
    pause
    exit /b 1
)

REM Create GitHub workflows directory if it doesn't exist
if not exist .github\workflows (
    echo Creating .github\workflows directory...
    mkdir .github\workflows
)

echo Git deployment setup complete!
echo Next steps:
echo 1. Review the workflow files in .github\workflows\
echo 2. Set up secrets in your GitHub repository for CI/CD
echo 3. Push to trigger the workflows

pause