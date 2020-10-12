run:
	cd kpt && \
	npm run build && \
	npx pkg dist/activeassist_run.js && \
	kpt fn run ../manifests/ --enable-exec --exec-path ./activeassist_run-macos