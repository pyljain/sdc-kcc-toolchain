run:
	cd kpt && \
	npm run build && \
	npx pkg dist/activeassist_run.js && \
	kpt fn run ../manifests/ --enable-exec --exec-path ./activeassist_run-macos

docker-build:
	cd kpt && npm run kpt:docker-build && cd ..

docker: docker-build
	kpt fn run ./manifests \
		--network \
		--image payaljain/activeassist:dev \
		--mount type=bind,src=$$GOOGLE_APPLICATION_CREDENTIALS,dst=/home/node/.gcloud/credentials.json