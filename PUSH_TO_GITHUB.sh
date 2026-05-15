#!/bin/bash

# ============================================================================
# AniVortex - Automated GitHub Push Script
# ============================================================================
# This script will:
# 1. Create a GitHub repository via API
# 2. Add remote to git
# 3. Push all committed files to GitHub
# 4. Display the repository URL
#
# Usage: bash PUSH_TO_GITHUB.sh YOUR_GITHUB_TOKEN YOUR_USERNAME
# ============================================================================

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     🎬 AniVortex - Automated GitHub Push Script              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check arguments
if [ $# -lt 2 ]; then
    echo -e "${RED}❌ Error: Missing arguments${NC}"
    echo ""
    echo -e "${YELLOW}Usage:${NC} bash PUSH_TO_GITHUB.sh YOUR_GITHUB_TOKEN YOUR_USERNAME"
    echo ""
    echo -e "${BLUE}Example:${NC}"
    echo "  bash PUSH_TO_GITHUB.sh ghp_xxxxxxxxxxxxxxxxxxx myusername"
    echo ""
    echo -e "${YELLOW}To get your GitHub token:${NC}"
    echo "  1. Go to: https://github.com/settings/tokens"
    echo "  2. Click 'Generate new token' → 'Generate new token (classic)'"
    echo "  3. Select scopes: repo, public_repo, gist"
    echo "  4. Copy the token (you won't see it again!)"
    echo ""
    exit 1
fi

GITHUB_TOKEN="$1"
GITHUB_USERNAME="$2"
REPO_NAME="anivortex"

echo -e "${BLUE}📋 Configuration:${NC}"
echo "  Username: $GITHUB_USERNAME"
echo "  Repository: $REPO_NAME"
echo ""

# Step 1: Create repository via GitHub API
echo -e "${BLUE}📦 Step 1: Creating GitHub repository via API...${NC}"

RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{
    \"name\": \"$REPO_NAME\",
    \"description\": \"Hindi anime streaming platform with Netflix-style design\",
    \"private\": false,
    \"auto_init\": false,
    \"has_issues\": true,
    \"has_projects\": true,
    \"has_downloads\": true,
    \"has_wiki\": true
  }")

# Check for errors
if echo "$RESPONSE" | grep -q "\"message\": \"Bad credentials\""; then
    echo -e "${RED}❌ Authentication failed!${NC}"
    echo -e "${YELLOW}The GitHub token is invalid or expired.${NC}"
    echo ""
    echo -e "${BLUE}To fix this:${NC}"
    echo "  1. Go to: https://github.com/settings/tokens"
    echo "  2. Generate a new personal access token"
    echo "  3. Run this script again with the new token"
    exit 1
elif echo "$RESPONSE" | grep -q "\"message\": \"Validation Failed\""; then
    if echo "$RESPONSE" | grep -q "\"name\": \"already exists\""; then
        echo -e "${YELLOW}⚠️  Repository already exists on GitHub${NC}"
        echo "  This is OK - we'll just push to it."
    else
        echo -e "${RED}❌ Repository creation failed:${NC}"
        echo "$RESPONSE" | jq '.'
        exit 1
    fi
elif echo "$RESPONSE" | grep -q "\"id\""; then
    REPO_ID=$(echo "$RESPONSE" | jq -r '.id')
    echo -e "${GREEN}✅ Repository created successfully!${NC}"
    echo "  Repository ID: $REPO_ID"
else
    echo -e "${RED}❌ Unexpected response from GitHub API:${NC}"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
    exit 1
fi

echo ""

# Step 2: Configure git remote
echo -e "${BLUE}🔗 Step 2: Configuring git remote...${NC}"

cd "$(dirname "$0")"

# Check if remote already exists
if git remote | grep -q origin; then
    echo "  Removing existing origin remote..."
    git remote remove origin
fi

# Add remote
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo -e "${GREEN}✅ Git remote configured${NC}"
echo "  Origin: https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo ""

# Step 3: Ensure on main branch
echo -e "${BLUE}📌 Step 3: Setting up main branch...${NC}"

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "  Renaming branch from $CURRENT_BRANCH to main..."
    git branch -M main
fi

echo -e "${GREEN}✅ On main branch${NC}"

echo ""

# Step 4: Push to GitHub
echo -e "${BLUE}⬆️  Step 4: Pushing code to GitHub...${NC}"

if git push -u origin main 2>&1; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
else
    echo -e "${RED}❌ Push failed!${NC}"
    echo ""
    echo -e "${YELLOW}Troubleshooting:${NC}"
    echo "  • Verify your GitHub token is valid"
    echo "  • Check internet connection"
    echo "  • Try again with: git push -u origin main"
    exit 1
fi

echo ""

# Step 5: Display results
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}✅ SUCCESS! Your repository is live on GitHub${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${GREEN}📍 Repository URL:${NC}"
echo "  https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

echo -e "${GREEN}📊 Repository Details:${NC}"
echo "  Owner: $GITHUB_USERNAME"
echo "  Name: $REPO_NAME"
echo "  Visibility: Public"
echo "  Branch: main"
echo ""

# Count files
FILE_COUNT=$(git ls-files | wc -l)
echo -e "${GREEN}📦 Files Pushed:${NC}"
echo "  Total files: $FILE_COUNT"
echo ""

# Show last few commits
echo -e "${GREEN}📝 Recent Commits:${NC}"
git log --oneline -5 | sed 's/^/  /'
echo ""

# Next steps
echo -e "${BLUE}🚀 Next Steps: Deploy to Vercel${NC}"
echo ""
echo "  1. Go to: https://vercel.com"
echo "  2. Sign in or create account (use GitHub login)"
echo "  3. Click 'Add New' → 'Project'"
echo "  4. Click 'Import Git Repository'"
echo "  5. Search for 'anivortex'"
echo "  6. Click 'Import' then 'Deploy'"
echo "  7. Wait for ✅ green checkmark"
echo "  8. Get live URL: https://anivortex.vercel.app (or similar)"
echo ""

echo -e "${GREEN}🎉 Your anime streaming platform is now on GitHub and ready for Vercel deployment!${NC}"
echo ""
