#!/bin/bash

# Git Deployment Setup Script

echo "Setting up Git deployment configuration..."

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "Error: Not in a git repository"
    exit 1
fi

# Create GitHub workflows directory if it doesn't exist
mkdir -p .github/workflows

# Copy workflow files if they don't exist
if [ ! -f .github/workflows/ci.yml ]; then
    echo "Creating CI workflow..."
    cp .github/workflows/ci.yml .github/workflows/ci.yml
fi

if [ ! -f .github/workflows/staging-deployment.yml ]; then
    echo "Creating staging deployment workflow..."
    cp .github/workflows/staging-deployment.yml .github/workflows/staging-deployment.yml
fi

if [ ! -f .github/workflows/production-deployment.yml ]; then
    echo "Creating production deployment workflow..."
    cp .github/workflows/production-deployment.yml .github/workflows/production-deployment.yml
fi

if [ ! -f .github/workflows/docker-build.yml ]; then
    echo "Creating Docker build workflow..."
    cp .github/workflows/docker-build.yml .github/workflows/docker-build.yml
fi

# Make Git hooks executable
echo "Setting up Git hooks..."
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/post-commit
chmod +x .git/hooks/pre-push

echo "Git deployment setup complete!"
echo "Next steps:"
echo "1. Review the workflow files in .github/workflows/"
echo "2. Set up secrets in your GitHub repository for CI/CD"
echo "3. Push to trigger the workflows"