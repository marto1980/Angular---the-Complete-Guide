# Angular - The Complete Guide

# To Add a New Angular Project:

git subtree add --prefix recipe-app git@github.com:marto1980/recipe-app.git main --squash

# Pushing Commits

## Push to the main tree:

git push origin main

## Optional step: add a commit to a subproject, e.g. services:

git subtree push --prefix services git@github.com:marto1980/services.git
