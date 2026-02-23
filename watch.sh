#!/bin/bash
# Watches Rust source files and rebuilds the WASM package on changes.
# Run `ng serve` separately in the ui/ directory.
cargo watch -w src -s "wasm-pack build --target web --release && echo '✔ WASM rebuilt'"
