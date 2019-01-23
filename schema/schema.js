const graphql = require('graphql');
const lodash = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data array 
var MoviesList =[
    { name:'Simbaa',producer:'Rohit Shetty',id:'1'},
    { name:'Dangal',producer:'Aamir Khan',id:'2'},
    { name:'3 Idiots',producer:'Rajkumar Hirani',id:'3'},
    { name:'Padmaavat',producer:'Sanjay Leela Bhansali',id:'4'},

];

//dummy data array
var ActorsList =[
    {name:'Ranveer Singh', age:'35', sex:'Male',status:'Married'},
    {name:'Ranbir Kapoor', age:'32', sex:'Male',status:'Single'},
    {name:'Hrithik Roshan', age:'48', sex:'Male',status:'Divorced'},
    {name:'Salman Khan', age:'51',sex:'Male',status:'Single'},
    {name:'Deepika Padukone', age:'32', sex:'Female',status:'Married'},
    {name:'Alia Bhatt', age:'24', sex:'Female',status:'Single'},
    {name:'Huma Qureshi',age:'34',sex:'Female',status:'Single'}
];

const MoviesType = new GraphQLObjectType({
    name: 'Movie', //Schema will be like this ----- movie(id: String): Movie
    fields:() => ({
        id: { type : GraphQLString}, //id field
        name: { type: GraphQLString }, //name field
        producer: { type : GraphQLString} // fproducer field
    })

});

const Actors = new GraphQLObjectType({
    name: 'Actors',
    fields:() => ({
        name: {type: GraphQLString},
        age: {type: GraphQLString},
        sex: {type: GraphQLString},
        status: {type: GraphQLString}
    })
})





const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields:{
        movie:{ //Schema will be like this ----- movie(id: String): Movie
            type: MoviesType, //MoviesType ( GraphQLObjectType ) defined above
            args: {
                id:{ type: GraphQLString}  //Schema will be like this ----- movie(id: String): Movie
            },
            resolve(parent,args){
                return lodash.find(MoviesList, {id: args.id}) // searching with id

            }
        }
        
    }

});

const RootQuery1 = new GraphQLObjectType({
    name : 'RootQueryType1',
    fields:{
        actors:{
            type: Actors,
            args:{
                name:{type: GraphQLString}
            },
            resolve(parent,args){
                return lodash.find(ActorsList,{name:args.name}) //searching with name __ Remember - names are case sensitive ie. a and A are two different things
            }
        }
        
    }

});


module.exports = new GraphQLSchema({
    query : RootQuery//passing RootQuery ( GraphQLObjectType ) defined above of name : RootQueryType
    //Root Types will be like this ----- query: RootQueryType 
    // change --- query : RootQuery to this ---- query : RootQuery1 ---- for executing second schema
});


/*Pass data like this for query : RootQuery

{
  movie(id:"1"){
    name
    producer
    
  }
}

Result will be like this ---

{
  "data": {
    "movie": {
      "name": "Simbaa",
      "producer": "Rohit Shetty"
    }
  }
}



*/

/*Pass data like this for query : RootQuery1

{
  actors(name:"Alia Bhatt"){
    name
    age,
    sex,
    status
  }
}

Result will be like this ---
{
  "data": {
    "actors": {
      "name": "Alia Bhatt",
      "age": "24",
      "sex": "Female",
      "status": "Single"
    }
  }
}


*/





