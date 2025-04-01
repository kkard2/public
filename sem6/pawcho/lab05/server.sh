#!/bin/sh
echo "Content-type: text/plain"
echo ""
echo "Server IP: $(hostname -I | awk '{print $1}')"
echo "Hostname: $(hostname)"
echo "App version: $VERSION"
