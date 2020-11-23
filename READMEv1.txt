
Docker stack:
- in folder Proiect/
- docker stack deploy -c compose-kong.yml proiect-cluster
- test cu Postman:
	-> login -> primesti token => copy token
	-> pentru get_recipes - paste token la Authorisation - Type: Bearer token => apoi send
	-> get_messages - nu e nev de token
- test cu Frontend:
	-> in folder frontend
	-> docker build -t frontend-image .
	-> docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true frontend-image
	-> in browser pe localhost:3001 ar tb sa apara