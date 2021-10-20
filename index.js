const { ApolloServer, gql, Mocklist } = require("apollo-server")

const typeDefs = gql`
    scalar Date


type SkiDay{
    id: ID!  
    date: Date!
    mountain : String!
    conditions: Conditions
   }


    type RemoveDayPayLoad {
        day:SkiDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }
enum Conditions{
    POWDER
    HEAVY
    ICE
    THIN
}

    type Query {
     totalDays: Int!  
     allDays : [SkiDay!]!
    }

    input AddDayInput {
        date: Date!
        mountain: String!
        conditions: Conditions
    }
    
    type Mutation {
            addDay(input: AddDayInput!): SkiDay
        removeDay(id: ID!): RemoveDayPayLoad!
    }
    type Subscription{
        newDay: SkiDay!}
`;

const resolvers = {
    Query: {
      resolved: () => 'Resolved',
    },
  };

const mocks = {
    Date: () => "1/2/2025",
    String: () => "Cool Data",
    Query: () => ({
        allDays: () => new Mocklist([1,15])
    })
};

    
const server = new ApolloServer({
    typeDefs,
    mocks,
    Mocklist
});

server.
listen()
.then(({url}) => 
console.log('Server running at ${url}'))