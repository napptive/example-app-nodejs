#/bin/bash

#
# This script updates the image of the component, triggering its update. To achieve this, we use a combination
# of the NAPPTIVE playground CLI and standard kubectl commands. Future releases of the CLI will enable performing
# this operation from a GitHub Action.
#

if [[ -z "${PLAYGROUND_PAT}" ]]; then
  echo "PLAYGROUND_PAT must be set with your Personal Access Token"
  return 1
else
  echo "PLAYGROUND_PAT is set."
fi

echo "Downloading NAPPTIVE Playground CLI"
curl -O https://storage.googleapis.com/artifacts.playground.napptive.dev/installer.sh && bash installer.sh

echo "Downloading Kubectl"
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl

echo "Preparing installation"
mkdir -p ./napptive
cp ./config/playground.yaml ./napptive/.playground.yaml

export PLAYGROUND_CONFIG="./napptive/"
echo "adding PLAYGROUND_CONFIG env: $PLAYGROUND_CONFIG"

echo "Login into NAPPTIVE Playground"
playground login --pat 
export PATH=$PATH:$(pwd)
playground env use ${ENV_NAME}

echo "Forcing rolling update to download newest image"
IMAGE="${TARGET_DOCKER_REGISTRY}/example-app-nodejs-api:${VERSION}"
# imagePullPolicy needs to be changed to Always, as by default it is not supported by the workload definition. Next release will have support for this.
echo "Update image... ${IMAGE}"
PATCH_DEPLOY="{\"spec\":{\"template\":{\"spec\":{\"containers\": [{\"name\":\"nodejs-api\", \"imagePullPolicy\":\"Always\"}]}}}}"
kubectl --kubeconfig ./napptive/default/napptive-kubeconfig patch deployments.apps nodejs-api -p "${PATCH_DEPLOY}" --type=strategic
PATCH="{\"spec\":{\"workload\":{\"spec\":{\"containers\": [{\"name\":\"nodejs-api\", \"image\":\"${IMAGE}\"}]}}}}"
kubectl --kubeconfig ./napptive/default/napptive-kubeconfig patch component nodejs-api -p "${PATCH}" --type=merge