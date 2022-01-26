#!/bin/bash
if [ -f ".env" ]; then
  rm .env
fi

if [ -d "build" ]; then
  rm -rf build
fi

if [ -d "node_modules" ]; then
  rm -rf node_modules
fi