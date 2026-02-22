#!/usr/bin/env bash
cd $(dirname "$0")

wasm-pack build --target web --release
cd ui
rm -rf .angular/ node_modules/
npm install ../pkg