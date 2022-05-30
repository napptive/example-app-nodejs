#Version must be overrided in the CI
VERSION=$(shell cat version)

# Docker options
TARGET_DOCKER_REGISTRY ?= $$USER

# Variables
BUILD_FOLDER=$(CURDIR)/build
BIN_FOLDER=$(BUILD_FOLDER)/bin
DOCKER_FOLDER=$(BUILD_FOLDER)/docker
K8S_FOLDER=$(BUILD_FOLDER)/k8s

UNAME := $(shell uname)
ifeq ($(UNAME), Darwin)
	SED := gsed
else
	SED := sed
endif

#Docker command
DOCKERCMD?=docker

# Tools
NPM_CMD=npm
NPM_BUILD=$(NPM_CMD) build
NPM_TEST=$(NPM_CMD) test

.PHONY: clean
# Remove build files
clean:
	@echo "Cleaining build folder: $(BUILD_FOLDER)"
	@rm -rf $(BUILD_FOLDER)

.PHONY: test
test:
	@echo "Executing tests"
	@$(NPM_TEST)

.PHONY: docker-build
docker-build: docker-build-api docker-build-at

.PHONY: docker-build-api
docker-build-api:
	$(DOCKERCMD) build --platform linux/amd64 -t $(TARGET_DOCKER_REGISTRY)/example-app-nodejs-api:$(VERSION) .

.PHONY: docker-build-at
docker-build-at:
	$(DOCKERCMD) build -f Dockerfile.newman --platform linux/amd64 -t $(TARGET_DOCKER_REGISTRY)/example-app-nodejs-api-at-runner:$(VERSION) .

.PHONY: docker-push
docker-push: docker-build
	@echo Pushing example-app-nodejs Docker images to DockerHub
	$(DOCKERCMD) push $(TARGET_DOCKER_REGISTRY)/example-app-nodejs-api:$(VERSION) || exit 1;
	$(DOCKERCMD) push $(TARGET_DOCKER_REGISTRY)/example-app-nodejs-api-at-runner:$(VERSION) || exit 1;

.PHONY: k8s
k8s:
	@rm -r $(K8S_FOLDER) || true
	@mkdir -p $(K8S_FOLDER)
	@mkdir -p $(K8S_FOLDER)/todoapp
	@mkdir -p $(K8S_FOLDER)/todoat
	@cp deployments/todoapp/* $(K8S_FOLDER)/todoapp/.
	@cp deployments/todoat/* $(K8S_FOLDER)/todoat/.
	@$(SED) -i 's/TARGET_DOCKER_REGISTRY/'$(TARGET_DOCKER_REGISTRY)'/' $(K8S_FOLDER)/todoapp/*.yaml
	@$(SED) -i 's/TARGET_DOCKER_REGISTRY/'$(TARGET_DOCKER_REGISTRY)'/' $(K8S_FOLDER)/todoat/*.yaml
	@$(SED) -i 's/VERSION/$(VERSION)/' $(K8S_FOLDER)/todoapp/*.yaml
	@$(SED) -i 's/VERSION/$(VERSION)/' $(K8S_FOLDER)/todoat/*.yaml
	@echo "Kubernetes files ready at $(K8S_FOLDER)/"