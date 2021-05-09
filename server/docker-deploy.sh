docker build -t aseerkt/insta:latest .

docker kill \$\(docker ps -q\)

docker run -p 4916:8080 -d aseerkt/insta:latest

docker ps

echo "Your heroku app name ?"
read app

heroku container:push --app=$app web

heroku container:release --app=$app web