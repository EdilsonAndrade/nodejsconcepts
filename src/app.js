const express = require('express');
const  cors = require('cors');
const {uuid} = require('uuidv4');
const app = express();
app.use(express.json());
app.use(cors());

const repositories = [];
app.get('/repositories', (request, response)=>{
   return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {url, title, techs} = request.body;
  const repo = {
    id: uuid(),
    likes:0,
    url,
    title, 
    techs,
    
  }
  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {url, title, techs} = request.body;
  var index = repositories.findIndex(x=>x.id === id);
  
  if(index >=0){
    repositories[index] = {...repositories[index],url, title, techs};
    return response.json(repositories[index] );
  }else{
    return response.status(400).json({error: 'Repository does not exist'});
  }
 

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  var index = repositories.findIndex(x=>x.id === id);
  if(index >=0){
    repositories.splice(index,1);
    return response.status(204).json();
  }
  return response.status(400).json({error: "No Content"});
  
  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  var index = repositories.findIndex(x=>x.id === id);
  
  if(index >=0){
    repositories[index] = {...repositories[index], likes: repositories[index].likes +1};
    return response.json(repositories[index] );
  }else{
    return response.status(400).json({error: 'Repository does not exist'});
  }

});

module.exports = app;
