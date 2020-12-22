#!/usr/bin/env bash
set -e; if [ -n "$DEBUG" ]; then set -x; fi

if [ -z "$(which docker)" ]; then
  echo "docker is required to build swagger" > /dev/stderr;
  exit 1;
fi

if [ -z "$(which yarn)" ]; then
  echo "yarn is required to build swagger" > /dev/stderr;
  exit 1;
fi

api_host=${API_HOST:-"event-capture.openstax.org"}
swagger_path="/api/v0/swagger.json"

secure=${SECURE:-"true"}
protocol=$(test "$secure" = "true" && echo "https" || echo "http")

project_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null 2>&1 && pwd )"
temp_dir=$(mktemp -d -t ci-XXXXXXXXXX)

echo "wrangling swagger file: $temp_dir/swagger.json" > /dev/stderr;

curl -s "$protocol://$api_host$swagger_path" \
  | docker run --rm -i stedolan/jq --arg host "$api_host" --arg protocol "$protocol" '. + {host: $host, schemes: ["$protocol"]}' \
  > "$temp_dir/swagger.json"

echo "building swagger into: $temp_dir/src" > /dev/stderr;

docker run --rm -v "$temp_dir:/shared" openapitools/openapi-generator-cli generate \
  -i /shared/swagger.json \
  -g typescript-fetch \
  -o /shared/src

echo "compiling typescript" > /dev/stderr;
cd "$temp_dir/src"

# swagger ts breaks on more recent version
yarn add typescript@3.5
yarn tsc --module commonjs --target es6 --lib es2015,dom --outDir dist --declaration index.ts

rm -rf "$project_dir/src/api"
mv dist "$project_dir/src/api"
