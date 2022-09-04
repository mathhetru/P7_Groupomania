# P7 Groupomania

> Le projet 7 "Créez un réseau social d'entreprise" de la formation Developpeur Web d'Openclassrooms 
> Groupomania Social Network for Project 7 of Web Developper training by OpenClassrooms 

Powered with : 
- VueJS + axios
- NodeJs + express + mongoose
- MongoDB Atlas

To run this project, you will need:
```
NodeJs
MongoDB Atlas
```
### Database

Create a database named groupomania

### Clone and install

Clone the project

```bash
  git clone https://github.com/mathhetru/P7_Groupomania
```

Go to the project directory

```bash
  cd P7-Groupomania
```

Install dependencies

```bash
  npm install
```

### Environment Variables

To run this project, you will need to add the following environment variables to a .env file

Create a `.env` file in `back` folder

`account` account name database  
`mdp` password database
`database` name of the database  

Example:

```
    account="administrateur"
    mdp="motdepasse"
    database="groupomania.azerty"
```

### Start the back

```bash
  cd ./back
  nodemon server or npm start
```

### Start the front

In an other terminal

```bash
  cd ./front
  npm run dev
```
You can go to http://127.0.0.1:5173 and enjoy !
