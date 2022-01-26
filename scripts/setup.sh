#!/bin/bash
readonly env_prefix=TF_VAR_
readonly example_vars=.env.example
readonly target_vars=.env

answer=""

function ask() {
  local var="$1"
  local example="$2"
  local current="$3"

  if [ -n "$current" ]; then
    hint="current: $current"
  else
    hint="example: $example"
  fi

  answer=""

  while [ -z "$answer" ]; do
    echo -ne "\t$name [$hint]: "
    read -r answer </dev/tty

    if [ -z "$answer" ] && [ -n "$current" ]; then
      answer="$current"
      break
    fi

    if [ -z "$answer" ] && [ -n "$example" ]; then
      answer="$example"
      break
    fi
  done
}

if [ -f "$target_vars" ]; then
  source "$target_vars"
fi

echo "Enter your ENV variables:"

new_vars=""

while IFS= read -r line; do
  var=$(echo "$line" | cut -d= -f1)
  example=$(echo "$line" | cut -d= -f2)
  current="${!var}"

  ask "$var" "$example" "$current"

  new_vars+="export $var=\"$answer\"\n"
done < <(cut -d' ' -f2 "$example_vars")

echo
echo "Saving to $target_vars:"
echo -en "$new_vars" | tee "$target_vars"

if [ ! -d "node_modules" ]; then
  npm i
fi