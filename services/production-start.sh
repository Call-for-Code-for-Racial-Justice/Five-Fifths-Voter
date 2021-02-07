#!/usr/bin/env bash
# I am not sure why this file is necessary. It seems that the below steps
# would happen automatically as part of the multi-buildpack setup.

# pwd is probably /home/vcap/app
export DEPS_DIR=$(realpath ../deps)

# load the multi buildpack vars
if [[ -f ../profile.d/000_multi-supply.sh ]]; then
  source ../profile.d/000_multi-supply.sh
else
  echo "WARNING did not find profile.d/000_multi-supply.sh"
fi

# load the python buildpack vars
if [[ -f ../profile.d/0_python.sh ]]; then
    source ../profile.d/0_python.sh
else
    echo "WARNING did not find profile.d/0_python.sh"
fi

# start the server
yarn start
