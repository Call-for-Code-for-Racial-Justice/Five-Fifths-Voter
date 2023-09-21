#!/usr/bin/env bash
set -e
set -x

IMAGE_TAG=$(date '+%FT%H%M%S')

# For local testing
if [[ -f .env.deploy ]]; then
    source .env.deploy
fi

# Install ibmcloud & the code engine & container registry
if ! command -v ibmcloud &> /dev/null
then
  curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
  ibmcloud plugin install -f code-engine
  ibmcloud plugin install -f container-registry
fi

# login - requires IBMCLOUD_API_KEY to be set
ibmcloud login -r ${IC_REGION} -g ${IC_GROUP}
ibmcloud cr region-set ${CR_REGION}
ibmcloud cr login

# Build the image
docker build  --ulimit nofile=102400:102400 -t ${CR_TAG}:$IMAGE_TAG .
docker push ${CR_TAG}:$IMAGE_TAG

# Update staging
ibmcloud ce project select --name ${CE_PROJ_NAME}
ibmcloud ce app logs --tail 5 --follow --name ${CE_APP_NAME} &
ibmcloud ce app update --scale-down-delay 3600 --image private.${CR_TAG}:$IMAGE_TAG --name ${CE_APP_NAME}
kill $(jobs -p) # this throws errors in zsh but is OK in bash
