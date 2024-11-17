import gql from "graphql-tag";

const typeDefs = gql`
    type Query {
        "Query to get tracks array for the homepage grid"
        trackForHome: [Track!]!
        track(id: ID!): Track
    }

    "A track is a group of Modules that teaches about a specific topic"
    type Track {
        id: ID!
        "the track's title"
        title: String!
        "the tack's main author"
        author: Author!
        "the track's main illustration to display in track card or track page details"
        thumbnail: String
        "the track's approximate lenght to complete, in minutes"
        length: Int
        "the number of modules this track contains"
        modulesCount: Int
        "The track's complete description, can be in Markdown format"
        description: String
        "The number of times a track has been viewed"
        numberOfViews: Int
        "The track's complete array of the Modules"
        modules: [Module!]!
    }

    type Module {
        id: ID!
        title:String!
        length: Int
    }

"Author of a complete type"
    type Author {
        id: ID!
        "Author's first and last name"
        name: String!
        "Author's profile picture url"
        photo: String
    }
`

export default typeDefs;