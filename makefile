dev-website:
	cd website && ng serve --open=true

dev-server:
	cd server && npx tsc-watch --onSuccess "node ../dist/server"

build-website:
	cd website && ng build --prod=true --outputPath="../dist/public"

build-server:
	cd server && npx tsc

